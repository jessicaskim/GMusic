const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db            = require('../models');

passport.serializeUser(function(user, done) {
  return done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.users.findById(id).then(function(user) {
    return done(null, user);
  }).catch(done);
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, done) {
  db.users.find({
    where: { email: email }
  }).then(function(user) {
    if (!user || !user.validPassword(password)) {
      done(null, false);
    } else {
      done(null, user);
    }
  }).catch(done);
}));

module.exports      = passport;