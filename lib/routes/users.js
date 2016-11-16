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
    let followedUsers = [];
    User.find({_id: currUser})
      .then(user => {
        followedUsers = (!user.usersFollowed) ? [] : user.usersFollowed;
        followedUsers.push(userToFollow);
        User.update({_id: currUser}, {$set: {usersFollowed: followedUsers}})
          .then(updated => res.send(updated))
          .catch(next);
      })
      .catch(next);
  })

  .put('/followThread/:id', ensureAuth, jsonParser, (req, res, next) => {
    const currUser = req.params.id;
    const threadToFollow = req.body.threadId;
    let followedThreads = [];
    User.find({_id: currUser})
      .then(user => {
        followedThreads = (!user.threadsFollowed) ? [] : user.threadsFollowed;
        followedThreads.push(threadToFollow);
        User.update({_id: currUser}, {$set: {threadsFollowed: followedThreads}})
          .then(updated => res.send(updated))
          .catch(next);
      })
      .catch(next);
  })

  .put('/:id', ensureAuth, ensureRole(['admin']), jsonParser, (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body)
    .then(updated => res.send(updated))
    .catch(next);
  });

module.exports = router;
