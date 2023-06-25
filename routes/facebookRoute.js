const express = require("express")
const router = express.Router();
const passport = require("passport")
var FacebookStrategy = require('passport-facebook');
require("../utils/passportAuth/facebookAuth")
require("../middlewares/passportSession")




router.get('/auth/facebook', passport.authenticate('facebook'));



router.get('/oauth2/redirect/facebook', passport.authenticate('facebook', {
    successReturnToOrRedirect: '/profile',
    failureRedirect: '/login'
}));


router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;