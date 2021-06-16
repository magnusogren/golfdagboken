const express = require('express');
const router = express.Router();
const Golfrunda = require('../models/golfrunda');
const Golfbana = require('../models/golfbana');
const { updateCampground } = require('../../YelpCamp/magnusVersion/controllers/campgrounds');
const { valideraGolfrunda } = require('../middleware');

router.get('/', async (req, res) => {
  const golfbanor = await Golfbana.find({});
  const golfrundor = await Golfrunda.find({});
  // console.log(golfdagbok);
  res.render('golfdagbok', { golfbanor, golfrundor });
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

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const golfrunda = await Golfrunda.findById(id);
  // console.log(golfrunda);
  res.render('golfdagbok/visa', { golfrunda });
});

router.get('/:id/andra', async (req, res) => {
  const { id } = req.params;
  const golfbanor = await Golfbana.find({});
  const golfrunda = await Golfrunda.findById(id);
  // console.log(golfrunda);
  res.render('golfdagbok/andra', { golfrunda, golfbanor });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updateradgolfrunda = await Golfrunda.findByIdAndUpdate(id, { ...req.body.golfrunda });
  console.log(updateradgolfrunda);
  await updateradgolfrunda.save();
  res.redirect(`/golfdagbok/${updateradgolfrunda._id}`);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Golfrunda.findByIdAndDelete(id);
  res.redirect('/golfdagbok');
});

module.exports = router;

// const { id } = req.params;
//   console.log(req.body);
//   const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
