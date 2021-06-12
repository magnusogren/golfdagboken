const express = require('express');
const router = express.Router();
const Golfcourse = require('../models/golfcourse');

router.get('/', async (req, res) => {
  const golfbanor = await Golfcourse.find({});
  console.log(golfbanor);
  res.render('golfbanor/index', { golfbanor });
});

module.exports = router;
