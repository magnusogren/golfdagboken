const express = require('express');
const router = express.Router();
const Golfdagbok = require('../models/golfdagbok');
const Golfbana = require('../models/golfbana');

router.get('/', async (req, res) => {
  const golfbanor = await Golfbana.find({});
  const golfdagbok = await Golfdagbok.find({});
  // console.log(golfdagbok);
  res.render('golfdagbok/index', { golfbanor, golfdagbok });
});

module.exports = router;
