
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Thread = require('../models/thread');
const ensureRole = require('../auth/ensureRoles');


router
  .get('./', (req, res, next) => {
    Thread.find({})
      .then(threads => res.send(threads))
      .catch(next);
  })

  .get('./:id', (req, res, next) => {
    let threadId = req.params.id;
    Thread.findById(threadId).lean()
      .then(thread => res.send(thread))
      .catch(next);
  })

  .post('./', bodyParser, (req, res, next) => {
    new Thread(req.body).save()
      .then(saved => res.send(saved))
      .catch(next);
  })

  .put('./:id', ensureRole(''), bodyParser, (req, res, next) => {
    // for ADMIN and MODERATOR, good to go
    Thread.findByIdAndUpdate(req.params.id, req.body)
      .then(updated => res.send(updated))
      .catch(next);
  })

  .delete('/:id', ensureRole(''), (req, res, next) => {
    Thread.findByIdAndRemove(req.params.id)
      .then(removed => res.send(removed))
      .catch(next);
  });

  module.exports = router;
