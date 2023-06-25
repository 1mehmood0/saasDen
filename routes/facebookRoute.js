const express = require("express")
const router = express.Router();
const passport = require("passport")
var FacebookStrategy = require('passport-facebook');
require("../utils/passportAuth/facebookAuth")




router.get('/auth/facebook', passport.authenticate('facebook'));



router.get('/oauth2/redirect/facebook', passport.authenticate('facebook', {
    successReturnToOrRedirect: '/profile',
    failureRedirect: '/login'
}));




module.exports = router;