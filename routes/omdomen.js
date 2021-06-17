const express = require('express');
const router = express.Router({ mergeParams: true });
const Omdome = require('../models/omdome');
const Golfbana = require('../models/golfbana');
const catchAsync = require('../utils/catchAsync');

router.post('/', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const golfbana = await Golfbana.findById(id);
  const omdome = new Omdome(req.body.omdome);

  console.log(req.params);
  // golfbana.omdomen.push(omdome);

  res.send(req.params);
});

module.exports = router;

// const campground = await Campground.findById(req.params.id);
// const review = new Review(req.body.review);
// review.author = req.user._id;
// campground.reviews.push(review);
// await review.save();
// await campground.save();
// req.flash('success', 'Created new review');
// res.redirect(`/campgrounds/${campground._id}`);
