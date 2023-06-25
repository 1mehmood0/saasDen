const express = require("express")
const router = express.Router();
const passport = require("passport")
require("../utils/passportAuth/googleAuth")
require("../middlewares/passportSession")


router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

router.get('/oauth2/redirect/google',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/profile');
    });

module.exports = router;