const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const User = require('../models/user');
const ensureRole = require('../auth/ensureRoles');
const ensureAuth = require('../auth/ensureAuth')();

router
  .get('/', ensureAuth, ensureRole(['admin']), (req, res, next) => {
    const query = {};
    User.find(query)
      .then(users => res.send(users))
      .catch(next);
  })

  .get('/:id', ensureAuth, (req, res, next) => {
    if ((req.user.id == req.params.id) || (req.user.roles == 'admin') || (req.user.roles == 'moderator') ) {
      User.findById(req.params.id)
        .then(user => res.send(user))
        .catch(next);
    } else {
      throw {code: 400, error: 'Not Authorized'};
    };
  })

  .get('/searchuser/:id', ensureAuth, (req, res, next) => {
    User.findById(req.params.id)
      .then(user => res.send(user))
      .catch(next);
  })

  .get('/searchusername/:name', (req, res, next) => {
    const query = {username: req.params.name};
    User.find(query)
      .then(users => res.send(users))
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
    User.findById(currUser)
      .then(user => {
        if (user.usersFollowed.indexOf(userToFollow) > -1) {
          res.send(user);
        } else {
          User.update({_id: currUser}, {$push: {usersFollowed: userToFollow}})
            .then(updated => res.send(updated))
            .catch(next);
        };
      })
      .catch(next);
  })

  .put('/followThread/:id', ensureAuth, jsonParser, (req, res, next) => {
    const currUser = req.params.id;
    const threadToFollow = req.body.threadId;
    User.findById(currUser)
      .then(user => {
        if (user.threadsFollowed.indexOf(threadToFollow) > -1) {
          res.send(user);
        } else {
          User.update({_id: currUser}, {$push: {threadsFollowed: threadToFollow}})
            .then(updated => res.send(updated))
            .catch(next);
        };
      })
      .catch(next);
  })

  .put('/:id', ensureAuth, ensureRole(['admin']), jsonParser, (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body)
    .then(updated => res.send(updated))
    .catch(next);
  });

module.exports = router;
