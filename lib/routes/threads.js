const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Thread = require('../models/thread');
const ensureAuth = require('../auth/ensureAuth')();
const ensureRole = require('../auth/ensureRoles');

router
  .get('/', (req, res, next) => {
    Thread.find({})
      .then(threads => res.send(threads))
      .catch(next);
  })

//find by region
 .get('/region/:region', (req, res, next) => {
   let region = req.params.region;
   Thread.find({region}).lean()
      .then((thread) => {
        res.send(thread);
      })
      .catch(next);
 })

//find by drink type
  .get('/drinkType/:drinkType', (req, res, next) => {
    let drinkType = req.params.drinkType;
    Thread.find({drinkType}).lean()
      .then((thread) => {
        res.send(thread);
      })
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    let threadId = req.params.id;
    Thread.findById(threadId).lean()
      .then(thread => res.send(thread))
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

