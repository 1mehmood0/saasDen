const express = require("express");
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var csrf = require('csurf');
var passport = require('passport');
const app = express();

const facebookRouter = require("./routes/facebookRoute");
const googleRouter = require("./routes/googleRoute");
const authRouter = require("./routes/authRoute");
const userAnalysisRouter = require("./routes/userAnalysisRoute");




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(csrf());
app.use(passport.authenticate('session'));
app.use(function (req, res, next) {
    var msgs = req.session.messages || [];
    res.locals.messages = msgs;
    res.locals.hasMessages = !!msgs.length;
    req.session.messages = [];
    next();
});
app.use(function (req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
});
app.use('/', facebookRouter);
app.use('/', googleRouter);
app.use('/', authRouter);
app.use('/user', userAnalysisRouter)


app.get('/ping', (req, res) => {
    res.send("pong");
})

module.exports = app;

