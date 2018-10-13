const express     = require('express');
const db          = require('../models');
const passport    = require('../config/ppConfig');
const router      = express.Router();


// Sign up routes
router.get('/signup',   (req, res) => {
  res.render('auth/signup');
});

// CREATE User
router.post('/signup',  (req, res) => {
  var email     = req.body.email;
  var name      = req.body.name;
  var password  = req.body.password;
  // var admin     = false;

  db.users.findOrCreate({
    where: { email: email },
    defaults: {
      name: name,
      password: password
    },
    logging: false
  }).spread(            (user, created) => {
    if (created) {
      passport.authenticate('local', {
        successRedirect:  '/queue',
        // successRedirect: '/profiles/new',
        successFlash: 'Account created and logged in'
      })(req, res);
    } else {
      req.flash('error', 'Email already exists');
      res.redirect('/auth/signup');
    }
  }).catch(             (error) => {
    req.flash('error', error.message);
    res.redirect('/auth/signup');
  });
});

router.get('/login',    (req, res) => {
  res.render('auth/login');
});



// Login routes
router.post('/login', passport.authenticate('local', {
  successRedirect:  '/queue',
  // successRedirect:  '/profiles/show',
  failureRedirect:  '/auth/login',
  failureFlash:     'Invalid username and/or password',
  successFlash:     'You have logged in'
}));

// Log Out routes
router.get('/logout',   (req, res) => {
  req.logout();
  req.flash('success', 'You have logged out');
  res.redirect('/');
});

module.exports = router;
