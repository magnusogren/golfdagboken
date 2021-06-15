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

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const inlagg = await Golfdagbok.findById(id);
  console.log(inlagg);
  res.render('golfdagbok/visa', { inlagg });
});

module.exports = router;
