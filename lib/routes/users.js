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
  })
  
  .put('/unfollowUser/:id', ensureAuth, jsonParser, (req, res, next) => {
  const currUser = req.params.id;
  const userToUnFollow = req.body.userId;
  User.findById(currUser)
    .then(user => {
      if (user.usersFollowed.indexOf(userToUnFollow) < 0) {
        // no user found to unfollow
        res.send(user);
      } else {
        let delIdx = user.usersFollowed.indexOf(userToUnFollow);
        let removedUsers = user.usersFollowed.splice(delIdx, 1);
        console.log('removed user', removedUsers);
        console.log('new follow list', user.usersFollowed);
        User.update({_id: currUser}, {$set: {usersFollowed: user.usersFollowed}}, {new: true})
        // User.save(user)
          .then(updated => res.send(updated))
          .catch(next);
      };
    })
    .catch(next);
  })

  .put('/unfollowThread/:id', ensureAuth, jsonParser, (req, res, next) => {
    const currUser = req.params.id;
    const threadToUnFollow = req.body.threadId;
    User.findById(currUser)
      .then(user => {
        if (user.threadsFollowed.indexOf(threadToUnFollow) < 0) {
          // no thread found to unfollow
          res.send(user);
        } else {
          let delIdx = user.threadsFollowed.indexOf(threadToUnFollow);
          let removedThreads = user.threadsFollowed.splice(delIdx, 1);
          console.log('removed thread', removedThreads);
          console.log('new follow list', user.threadsFollowed);
          User.update({_id: currUser}, {$set: {threadsFollowed: user.threadsFollowed}}, {new: true})
          // User.save(user)
            .then(updated => res.send(updated))
            .catch(next);
        };
      })
      .catch(next);
  });

module.exports = router;
