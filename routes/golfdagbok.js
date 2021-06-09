const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // const golfbanor = await Golfcourse.find({});
  res.render('golfdagbok/index');
});

module.exports = router;
