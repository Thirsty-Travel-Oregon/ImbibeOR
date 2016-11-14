const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Remark = require('../models/region');

router
  .get('/', (req, res, next) => {
    Region.find({})
      .then(regions => res.send(regions))
      .catch(next);
  });