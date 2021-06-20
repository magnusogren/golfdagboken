const express = require('express');
const router = express.Router();
const Golfbana = require('../models/golfbana');
const catchAsync = require('../utils/catchAsync');

router.get(
  '/',
  catchAsync(async (req, res) => {
    const golfbanor = await Golfbana.find({});
    // const golfbanor = golfbanorarr[0];
    // console.log(golfbanor[0]);
    res.render('golfbanor', { golfbanor });
  })
);

router.get(
  '/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const golfbana = await Golfbana.findById(id).populate({
      path: 'omdomen',
      populate: { path: 'spelare' },
    });
    console.log(golfbana);
    res.render('golfbanor/visa', { golfbana });
  })
);

module.exports = router;
