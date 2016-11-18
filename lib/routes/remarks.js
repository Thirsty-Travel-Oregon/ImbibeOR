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
    console.log('in the remarks post route');
    new Remark(req.body).save()
      .then(saved => res.send(saved))
      .catch(next);
  })

  .put('/:id', ensureAuth, bodyParser, (req, res, next) => {
    Remark.findById(req.params.id).lean()
      .then(remark => {
        return ((req.user.id == remark.userId) || (req.user.roles == 'admin') || (req.user.roles == 'moderator') );
      })
      .then(okToDo => {
        if (okToDo) {
          return Remark.findByIdAndUpdate(req.params.id, req.body);
        } else {
          throw {code: 400, error: 'Not Authorized'};
        };
      })
      .then(updated => res.send(updated))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Remark.findById(req.params.id).lean()
      .then(remark => {
        return ((req.user.id == remark.userId) || (req.user.roles == 'admin') || (req.user.roles == 'moderator') );
      })
      .then(okToDo => {
        if (okToDo) {
          return Remark.findbyIdAndRemove(req.params.id);
        } else {
          throw {code: 400, error: 'Not Authorized'};
        };
      })
      .then(removed => res.send(removed))
      .catch(next);
  });

module.exports = router;
