const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const User = require('../models/user');
const ensureRole = require('../auth/ensureRoles');

router
  .get('/', (req, res, next) => {
    const query = {};
    User.find(query)
      .then(users => res.send(users))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    User.findById(req.params.id)
    .then(user => res.send(user))
    .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    User.findByIdAndRemove(req.params.id)
    .then(removed => res.send(removed))
    .catch(next);
  })

  .post('/', jsonParser, (req, res, next) => {
    new User(req.body).save()
    .then(saved => res.send(saved))
    .catch(next);
  })

  .put('/:id', jsonParser, (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body)
    .then(updated => res.send(updated))
    .catch(next);
  });

module.exports = router;
