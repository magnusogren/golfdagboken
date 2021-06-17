const express = require('express');
const router = express.Router();
const Anvandare = require('../models/anvandare');
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');

router.get('/registrera', (req, res) => {
  res.render('anvandare/registrera');
});

router.post(
  '/registrera',
  catchAsync(async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    const anvandare = new Anvandare({ email, username });
    const registreradAnvandare = await Anvandare.register(anvandare, password);
    res.redirect('/golfdagbok');
  })
);

router.get('/loggain', (req, res) => {
  res.render('anvandare/loggain');
});

router.post(
  '/loggain',
  passport.authenticate('local', { failureFlash: false, failureRedirect: '/loggain' }),
  (req, res) => {
    console.log(res.session);
    const redirectUrl = req.session.returnTo || '/golfdagbok';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
    // res.redirect('/golfdagbok');
  }
);

router.get('/loggaut', (req, res) => {
  req.logout();
  // console.log(res.session, req.user, res.locals);
  res.redirect('/golfbanor');
});

module.exports = router;
