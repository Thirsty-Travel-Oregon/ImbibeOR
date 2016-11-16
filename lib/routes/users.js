const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const User = require('../models/user');
const ensureRole = require('../auth/ensureRoles');

router
  .get('/', ensureAuth, ensureRole(['admin']), (req, res, next) => {
    const query = {};
    User.find(query)
      .then(users => res.send(users))
      .catch(next);
  })

  .get('/:id', ensureAuth, ensureRole(['admin']), (req, res, next) => {
    User.findById(req.params.id)
    .then(user => res.send(user))
    .catch(next);
  })

  .delete('/:id', ensureAuth, ensureRole(['admin']), (req, res, next) => {
    User.findByIdAndRemove(req.params.id)
    .then(removed => res.send(removed))
    .catch(next);
  })

  .post('/', ensureAuth, ensureRole(['admin']), jsonParser, (req, res, next) => {
    new User(req.body).save()
    .then(saved => res.send(saved))
    .catch(next);
  })

  .put('/followUser/:id', ensureAuth, jsonParser, (req, res, next) => {
    const currUser = req.params.id;
    const userToFollow = req.body.userId;
    User.find({_id: currUser})
    
    User.findByIdAndUpdate(req.params.id, req.body)
    .then(updated => res.send(updated))
    .catch(next);
  })

  .put('/followThread/:id', ensureAuth, jsonParser, (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body)
    .then(updated => res.send(updated))
    .catch(next);
  })

  .put('/:id', ensureAuth, ensureRole(['admin']), jsonParser, (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body)
    .then(updated => res.send(updated))
    .catch(next);
  });

module.exports = router;
