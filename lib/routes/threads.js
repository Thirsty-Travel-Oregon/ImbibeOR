const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Thread = require('../models/thread');
const Remark = require('../models/remark');
const ensureAuth = require('../auth/ensureAuth')();
const ensureRole = require('../auth/ensureRoles');
const getPayload = require('../auth/getPayload')();

// nice! way to extract common functionality into function
function checkForOwner (thread, thePayload) {
  const bossRole = ((thePayload.role === 'admin') || (thePayload.role === 'moderator'));
  thread.isOwner = (bossRole || (thread.userId === thePayload.userId));
  if (thread.remarks.length > 0) {
    thread.remarks.forEach((currRem) => {
      if (bossRole) currRem.isOwner = true;
      else currRem.isOwner = (currRem.userId === thePayload.userId);
    });
  };
};

router
  .get('/', getPayload, (req, res, next) => {
    const myPayload = req.returnPayload;
    Thread.find()
      .then(threads => {
        let updatedThreads = threads.map((thread) => {
          return Remark.find({threadId: thread._id}).select('text threadId parentRemId userId username').lean();
        });
        return Promise.all(updatedThreads)
          .then((remarks) => {
            let finalThreads = threads.map((oldelement, index) => {
              let element = JSON.parse(JSON.stringify(oldelement));
              element.remarks = remarks[index];
              return element;
            });
            return finalThreads;
          });
      })
      .then((finalThreads) => {
        finalThreads.forEach((thread) => {
          checkForOwner(thread, myPayload);
        });
        res.send(finalThreads);
      })
      .catch(next);
  })

//find by region or drinkType
  // these should be query parameters on .get route above, 
  // it's not a separate resource or a sub resource
  .get('/region/:region/drinkType/:drinkType', getPayload, (req, res, next) => {
    const myPayload = req.returnPayload;
    const query = {};
    const region = req.params.region;
    const drinkType = req.params.drinkType;
    if (region !== 'all') query.region = region;
    if (drinkType !== 'all') query.drinkType = drinkType;
    Thread.find(query).lean()
      // rest of this code is identical!!!
      .then(threads => {
        let updatedThreads = threads.map((thread) => {
          return Remark.find({threadId: thread._id}).select('text threadId parentRemId userId username').lean();
        });
        return Promise.all(updatedThreads)
          .then((remarks) => {
            let finalThreads = threads.map((oldelement, index) => {
              let element = JSON.parse(JSON.stringify(oldelement));
              element.remarks = remarks[index];
              return element;
            });
            return finalThreads;
          });
      })
      .then((finalThreads) => {
        finalThreads.forEach((thread) => {
          checkForOwner(thread, myPayload);
        });
        res.send(finalThreads);
      })
      .catch(next);
  })

//find by region
  // ditto here...
  .get('/region/:region', getPayload, (req, res, next) => {
    const myPayload = req.returnPayload;
    let region = req.params.region;
    Thread.find({region}).lean()
      .then(threads => {
        let updatedThreads = threads.map((thread) => {
          return Remark.find({threadId: thread._id}).select('text threadId parentRemId userId username').lean();
        });
        return Promise.all(updatedThreads)
          .then((remarks) => {
            let finalThreads = threads.map((oldelement, index) => {
              let element = JSON.parse(JSON.stringify(oldelement));
              element.remarks = remarks[index];
              return element;
            });
            return finalThreads;
          });
      })
      .then((finalThreads) => {
        finalThreads.forEach((thread) => {
          checkForOwner(thread, myPayload);
        });
        res.send(finalThreads);
      })
      .catch(next);
  })

//find by drink type
  // and here
  .get('/drinkType/:drinkType', getPayload, (req, res, next) => {
    const myPayload = req.returnPayload;
    let drinkType = req.params.drinkType;
    Thread.find({drinkType}).lean()
      .then(threads => {
        let updatedThreads = threads.map((thread) => {
          return Remark.find({threadId: thread._id}).select('text threadId parentRemId userId username').lean();
        });
        return Promise.all(updatedThreads)
          .then((remarks) => {
            let finalThreads = threads.map((oldelement, index) => {
              let element = JSON.parse(JSON.stringify(oldelement));
              element.remarks = remarks[index];
              return element;
            });
            return finalThreads;
          });
      })
      .then((finalThreads) => {
        finalThreads.forEach((thread) => {
          checkForOwner(thread, myPayload);
        });
        res.send(finalThreads);
      })
      .catch(next);
  })

  .get('/:id', getPayload, (req, res, next) => {
    const myPayload = req.returnPayload;
    let threadId = req.params.id;
    Promise
      .all([
        Thread.findById(threadId).lean(),
        Remark.find({threadId}).select('text threadId parentRemId userId username').lean()
      ])
      .then(([thread, remarks]) => {
        thread.remarks = remarks;
        checkForOwner(thread, myPayload);
        // route signature is a single resource, send the object, not an array
        res.send([thread]);
      })
      .catch(next);
  })

  .post('/', ensureAuth, bodyParser, (req, res, next) => {
    new Thread(req.body).save()
      .then(saved => res.send(saved))
      .catch(next);
  })

  .put('/:id', ensureAuth, bodyParser, (req, res, next) => {
    Thread.findById(req.params.id).lean()
      .then(thread => {
        return ((req.user.id == thread.userId) || (req.user.roles == 'admin') || (req.user.roles == 'moderator') );
      })
      .then(okToDo => {
        if (okToDo) {
          return Thread.findByIdAndUpdate(req.params.id, req.body);
        } else {
          throw {code: 400, error: 'Not Authorized'};
        };
      })
      .then(updated => res.send(updated))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    console.log('id in delete thread route', req.params.id);
    Thread.findById(req.params.id).lean()
      .then(thread => {
        return ((req.user.id == thread.userId) || (req.user.roles == 'admin') || (req.user.roles == 'moderator') );
      })
      .then(okToDo => {
        if (okToDo) {
          return Thread.findByIdAndRemove(req.params.id);
        } else {
          throw {code: 400, error: 'Not Authorized'};
        };
      })
      .then(removed => res.send(removed))
      .catch(next);
  });

module.exports = router;

