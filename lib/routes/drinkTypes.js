const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Remark = require('../models/drinkType');

router
  .get('/', (req, res, next) => {
    DrinkType.find({})
      .lean()
      .then((drinkTypes) => res.send(drinkTypes))
      .catch(next);
  });

module.exports = router;