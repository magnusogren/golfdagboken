const express = require('express');
const router = express.Router();
const Golfcourse = require('../models/golfcourse');

router.get('/', async (req, res) => {
	const golfbanor = await Golfcourse.find({});
	console.log(golfbanor[0].courses.length);
	console.log(golfbanor[0].geometry.coordinates);
	res.render('golfbanor/index', { golfbanor });
});

module.exports = router;
