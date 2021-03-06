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
    try {
      const { username, email, password } = req.body;
      // console.log(req.body);
      const anvandare = new Anvandare({ email, username });
      const registreradAnvandare = await Anvandare.register(anvandare, password);
      req.login(registreradAnvandare, (err) => {
        if (err) return next(err);
        req.flash('succe', 'Välkommen till Golfdagboken!');
        res.redirect('/golfbanor');
      });
    } catch (e) {
      res.redirect('/registrera');
    }
  })
);

router.get('/loggain', (req, res) => {
  res.render('anvandare/loggain');
});

router.post(
  '/loggain',
  passport.authenticate('local', {
    failureFlash: 'Felaktigt användarnamn eller lösenord',
    failureRedirect: '/loggain',
  }),
  (req, res) => {
    req.flash('succe', 'Välkommen tillbaka!');
    res.redirect('/golfdagbok');
    // res.redirect('/golfdagbok');
  }
);

router.get('/loggaut', (req, res) => {
  req.logout();
  // console.log(res.session, req.user, res.locals);
  res.redirect('/golfbanor');
});

module.exports = router;
