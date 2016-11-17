const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Thread = require('../models/thread');
const Remark = require('../models/remark');
// const User = require('../models/user');
const ensureAuth = require('../auth/ensureAuth')();
const ensureRole = require('../auth/ensureRoles');

function checkForOwner (thread, currUser) {
  thread.isOwner = (thread.userId === currUser);
  if (thread.remarks.length > 0) {
    thread.remarks.forEach((currRem) => {
      currRem.isOwner = (currRem.userId === currUser);
    });
  };
};

router
  .get('/', (req, res, next) => {
    let currUserId = req.body.currUser;
    Thread.find()
      .then(threads => {
        let updatedThreads = threads.map((thread) => {
          return Remark.find({threadId: thread._id}).select('text threadId parentRemId userId').lean();
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
          checkForOwner(thread, currUserId);
        });
        res.send(finalThreads);
      })
      .catch(next);
  })

//find by region or drinkType
  .get('/region/:region/drinkType/:drinkType', (req, res, next) => {
    const query = {};
    const region = req.params.region;
    const drinkType = req.params.drinkType;
    if (region !== 'all') query.region = region;
    if (drinkType !== 'all') query.drinkType = drinkType;
    Thread.find(query).lean()
      .then((threads) => {
        // threads.forEach((thread) => {
        //   checkForOwner(thread, currUserId);
        // });
        res.send(threads);
      })
      .catch(next);
  })

//find by region
  .get('/region/:region', (req, res, next) => {
    const query = {};
    const region = req.params.region;
    const drinkType = req.params.drinkType;
    if (region !== 'all') query.region = region;
    if (drinkType !== 'all') query.drinkType = drinkType;
    Thread.find(query).lean()
      .then((threads) => {
        // threads.forEach((thread) => {
        //   checkForOwner(thread, currUserId);
        // });
        res.send(threads);
      })
      .catch(next);
  })

//find by drink type
  // .get(/drinkType/:drinkType/region/:region)
  .get('/drinkType/:drinkType', (req, res, next) => {
    const query = {};
    let paramsArray = req.params.drinkType.split('+');
    let drinkType = paramsArray[0];
    if (drinkType !== 'all') query.drinkType = drinkType;
    if (paramsArray.length > 1) query.region = paramsArray[1];
    Thread.find(query).lean()
      .then((threads) => {
        threads.forEach((thread) => {
          checkForOwner(thread, currUserId);
        });
        res.send(threads);
      })
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    let threadId = req.params.id;
    Promise
      .all([
        Thread.findById(threadId).lean(),
        Remark.find({threadId}).select('text threadId parentRemId userId').lean()
      ])
      .then(([thread, remarks]) => {
        thread.remarks = remarks;
        // checkForOwner(thread, currentUser);
        res.send(thread);
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
        ensureRole(['admin','moderator'], thread.userId);
        Thread.findByIdAndUpdate(req.params.id, req.body)
          .then(updated => res.send(updated))
          .catch(next);
      })
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Thread.findById(req.params.id).lean()
      .then(thread => {
        ensureRole(['admin','moderator'], thread.userId);
        Thread.findByIdAndRemove(req.params.id)
          .then(removed => res.send(removed))
          .catch(next);
      })
      .catch(next);
  });

module.exports = router;

