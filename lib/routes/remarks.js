const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Remark = require('../models/remark');
const ensureAuth = require('../auth/ensureAuth')();
const ensureRole = require('../auth/ensureRoles');

// DRY! pull out common functionality across router methods
// This is also used by threads.js, pull out to own module...
// (side question: why == instead of === ? is there a type coercion happening here?)
function validToEdit(user, resource){
  // okay to edit own
  if(user.id == resource.userId) return;
  // otherwise must be admin or moderator 
  if( user.roles == 'admin' || user.roles == 'moderator') return;
  // not authorized
  throw {code: 400, error: 'Not Authorized'};
}

router
  .get('/', (req, res, next) => {
    Remark.find({})
      .lean()
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
      .then(remark => validToEdit(req.user, remark))
      .then(() => Remark.findByIdAndUpdate(req.params.id, req.body))
      .then(updated => res.send(updated))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Remark.findById(req.params.id).lean()
      .then(remark => validToEdit(req.user, remark))
      .then(okToDo => Remark.findByIdAndRemove(req.params.id))
      .then(removed => res.send(removed))
      .catch(next);
  });

module.exports = router;
