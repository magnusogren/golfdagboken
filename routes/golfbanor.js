const express = require('express');
const router = express.Router();
const Golfbana = require('../models/golfbana');

router.get('/', async (req, res) => {
  const golfbanor = await Golfbana.find({});
  // const golfbanor = golfbanorarr[0];
  // console.log(golfbanor[0]);
  res.render('golfbanor', { golfbanor });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const golfbana = await Golfbana.findById(id);
  // console.log(golfbana);
  res.render('golfbanor/visa', { golfbana });
});

module.exports = router;
