const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Remark = require('../models/remark');
const ensureAuth = require('../auth/ensureAuth')();
const ensureRole = require('../auth/ensureRoles');

router
  .get('/', (req, res, next) => {
    Remark.find({})
      .then(remarks => res.send(remarks))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    let remarkId = req.params.id;
    Remark.findById(remarkId).lean()
      .then(remark => res.send(remark))
      .catch(next);
  })

  .post('/', ensureAuth, bodyParser, (req, res, next) => {
    new Remark(req.body).save()
      .then(saved => res.send(saved))
      .catch(next);
  })

  .put('/:id', ensureAuth, bodyParser, (req, res, next) => {
    Remark.findById(req.params.id).lean()
      .then(remark => {
        ensureRole(['admin','moderator'],remark.userId);
      })
      .findbyIdAndUpdate(req.params.id, req.body)
      .then(updated => res.send(updated))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Remark.findById(req.params.id).lean()
      .then(remark => {
        ensureRole(['admin','moderator'],remark.userId);
      })
      .findbyIdAndRemove(req.params.id)
      .then(removed => res.send(removed))
      .catch(next);
  });

module.exports = router;
