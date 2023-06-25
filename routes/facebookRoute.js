const express = require("express")
const router = express.Router();
const passport = require("passport")
var FacebookStrategy = require('passport-facebook');
require("../utils/passportAuth/facebookAuth")
require("../middlewares/passportSession")


router.get('/login', function (req, res, next) {
    res.render('login');
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/profile', isLoggedIn, function (req, res) {
    res.render('profile', {
        user: req.user // get the user out of session and pass to template
    });
});

router.get('/oauth2/redirect/facebook', passport.authenticate('facebook', {
    successReturnToOrRedirect: '/profile',
    failureRedirect: '/login'
}));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}


router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;