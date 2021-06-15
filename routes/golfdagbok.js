const express = require('express');
const router = express.Router();
const Golfrunda = require('../models/golfrunda');
const Golfbana = require('../models/golfbana');

router.get('/', async (req, res) => {
  const golfbanor = await Golfbana.find({});
  const golfrundor = await Golfrunda.find({});
  // console.log(golfdagbok);
  res.render('golfdagbok/index', { golfbanor, golfrundor });
});

router.get('/ny', async (req, res) => {
  const golfbanor = await Golfbana.find({});
  res.render('golfdagbok/ny', { golfbanor });
});

router.post('/', async (req, res) => {
  const golfrunda = new Golfrunda(req.body.golfrunda);
  const url = req.body.url;
  golfrunda.bilder = { url };
  await golfrunda.save();
  console.log(golfrunda);
  res.redirect('golfdagbok');
});
// campground.images = req.files.map((f) => ({ url: f.path, filename: f.filename }));

// const campground = new Campground(req.body.campground);
//   campground.geometry = geoData.body.features[0].geometry;
//   campground.images = req.files.map((f) => ({ url: f.path, filename: f.filename }));
//   campground.author = req.user._id;
//   await campground.save();
//   console.log(campground);
//   req.flash('success', 'Successfully made a new campground');
//   res.redirect(`/campgrounds/${campground._id}`);

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const golfrunda = await Golfrunda.findById(id);
  console.log(golfrunda);
  res.render('golfdagbok/visa', { golfrunda });
});

module.exports = router;
