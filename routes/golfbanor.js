const express = require('express');
const router = express.Router();
const Golfbana = require('../models/golfbana');

router.get('/', async (req, res) => {
  const golfbanor = await Golfbana.find({});
  // const golfbanor = golfbanorarr[0];
  console.log(golfbanor);
  res.render('golfbanor/index', { golfbanor });
});

module.exports = router;
