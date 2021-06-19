const express = require('express');
const router = express.Router();
const Golfrunda = require('../models/golfrunda');
const Golfbana = require('../models/golfbana');
const Omdome = require('../models/omdome');
// const { updateCampground } = require('../../YelpCamp/magnusVersion/controllers/campgrounds');
const { valideraGolfrunda } = require('../middleware');
const catchAsync = require('../utils/catchAsync');
const golfbana = require('../models/golfbana');

router.get(
  '/',
  catchAsync(async (req, res) => {
    const golfbanor = await Golfbana.find({});
    const golfrundor = await Golfrunda.find({});
    // console.log(golfdagbok);
    res.render('golfdagbok', { golfbanor, golfrundor });
  })
);

router.get(
  '/ny',
  catchAsync(async (req, res) => {
    const golfbanor = await Golfbana.find({});
    res.render('golfdagbok/ny', { golfbanor });
  })
);

router.post(
  '/',
  valideraGolfrunda,
  catchAsync(async (req, res, next) => {
    const golfrunda = new Golfrunda(req.body.golfrunda);
    const { betyg, text } = req.body;
    const url = req.body.url;
    golfrunda.bilder = { url };
    golfrunda.spelare = req.user._id;
    if (betyg !== 1 && text !== '') {
      const omdome = new Omdome();
      omdome.text = text;
      omdome.betyg = betyg;
      const golfbana = await Golfbana.find({ name: `${golfrunda.bana}` });
      golfbana.omdomen.push(omdome);
    }
    await golfrunda.save();
    res.redirect(`golfdagbok/${golfrunda._id}`);
  })
);

// const { id } = req.params;
//     const golfbana = await Golfbana.findById(id);
//     const omdome = new Omdome(req.body.omdome);
//     golfbana.omdomen.push(omdome);
//     await omdome.save();
//     await golfbana.save();

router.get(
  '/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const golfrunda = await Golfrunda.findById(id).populate('spelare');
    console.log(req.session, req.user);
    res.render('golfdagbok/visa', { golfrunda });
  })
);

router.get(
  '/:id/andra',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const golfbanor = await Golfbana.find({});
    const golfrunda = await Golfrunda.findById(id);
    // console.log(golfrunda);
    res.render('golfdagbok/andra', { golfrunda, golfbanor });
  })
);

router.put(
  '/:id',
  valideraGolfrunda,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const updateradgolfrunda = await Golfrunda.findByIdAndUpdate(id, { ...req.body.golfrunda });
    console.log(updateradgolfrunda);
    await updateradgolfrunda.save();
    res.redirect(`/golfdagbok/${updateradgolfrunda._id}`);
  })
);

router.delete(
  '/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Golfrunda.findByIdAndDelete(id);
    res.redirect('/golfdagbok');
  })
);

module.exports = router;

// const { id } = req.params;
//   console.log(req.body);
//   const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
