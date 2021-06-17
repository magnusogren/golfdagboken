const express = require('express');
const router = express.Router({ mergeParams: true });
const Omdome = require('../models/omdome');
const Golfbana = require('../models/golfbana');
const catchAsync = require('../utils/catchAsync');
const { valideraOmdome } = require('../middleware');

router.post(
  '/',
  valideraOmdome,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const golfbana = await Golfbana.findById(id);
    const omdome = new Omdome(req.body.omdome);
    golfbana.omdomen.push(omdome);
    await omdome.save();
    await golfbana.save();
    // console.log(golfbana, omdome);
    res.redirect(`/golfbanor/${golfbana._id}`);
  })
);

router.delete(
  '/:omdomeId',
  catchAsync(async (req, res) => {
    const { id, omdomeId } = req.params;
    console.log(req.params);
    await Golfbana.findByIdAndUpdate(id, { $pull: { omdomen: omdomeId } });
    await Omdome.findByIdAndDelete(req.params.omdomeId);
    res.redirect(`/golfbanor/${id}`);
    // res.send('TEST');
  })
);

module.exports = router;

// const campground = await Campground.findById(req.params.id);
// const review = new Review(req.body.review);
// review.author = req.user._id;
// campground.reviews.push(review);
// await review.save();
// await campground.save();
// req.flash('success', 'Created new review');
// res.redirect(`/campgrounds/${campground._id}`);
