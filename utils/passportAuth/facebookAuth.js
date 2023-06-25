var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
const users = require("../../db/models/users")
const FB_URL = 'https://www.facebook.com'
const config = require("../../config")


passport.use(new FacebookStrategy({
    clientID: config['FACEBOOK-CLIENT-ID'],
    clientSecret: config['FACEBOOK-CLIENT-SECRET'],
    callbackURL: '/oauth2/redirect/facebook',
    state: true
}, async (accessToken, refreshToken, profile, cb) => {
    console.log(profile)
    try {
        const savedUser = await users.getUser({ id: profile.id, provider: FB_URL });
        //console.log("savedUser", savedUser);
        if (!savedUser) {
            await users.insertUser({
                id: profile.id,
                name: profile.displayName,
                provider: FB_URL
            });
            const user = {
                id: profile.id,
                name: profile.displayName
            };
            return cb(null, user);
        } else {
            return cb(null, savedUser);
        }
    } catch (error) {
        console.log(error, "While FB-login");
        return cb(error);
    }
}
));

passport.serializeUser((user, cb) => {
    process.nextTick(() => {
        cb(null, { id: user.id, username: user.username, name: user.name });
    });
});

passport.deserializeUser((user, cb) => {
    process.nextTick(() => {
        return cb(null, user);
    });
})