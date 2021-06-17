const express = require('express');
const router = express.Router();
const Anvandare = require('../models/anvandare');
const catchAsync = require('../utils/catchAsync');

router.get('/registrera', (req, res) => {
	res.render('anvandare/registrera');
});

module.exports = router;
