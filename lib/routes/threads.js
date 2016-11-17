const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Thread = require('../models/thread');
const Remark = require('../models/remark');
const ensureAuth = require('../auth/ensureAuth')();
const ensureRole = require('../auth/ensureRoles');

router
  .get('/', (req, res, next) => {
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
      .then((finalThreads) => res.send(finalThreads))
      .catch(next);
  })

//find by region
 .get('/region/:region', (req, res, next) => {
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
        res.send(finalThreads);
      })
      .catch(next);
 })

//find by drink type
  .get('/drinkType/:drinkType', (req, res, next) => {
    let drinkType = req.params.drinkType;
    Thread.find({drinkType}).lean()
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
        res.send(finalThreads);
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

