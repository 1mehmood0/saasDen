function isLoggedIn(req, res, next) {
    if (req.user.id)
        return next();
    res.redirect('/login');
}

module.exports = {
    isLoggedIn
}