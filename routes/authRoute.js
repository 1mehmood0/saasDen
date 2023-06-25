const express = require("express")
const router = express.Router();
const { isLoggedIn } = require("../middlewares/auth")

router.get('/login', function (req, res, next) {
    res.render('login');
});

router.get('/profile', isLoggedIn, function (req, res) {
    res.render('profile', {
        user: req.user // get the user out of session and pass to template
    });
});

module.exports = router;

