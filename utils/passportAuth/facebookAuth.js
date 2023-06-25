var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
const users = require("../../db/models/users")
const FB = 'FACEBOOK'
const config = require("../../config")


passport.use(new FacebookStrategy({
    clientID: config['FACEBOOK-CLIENT-ID'],
    clientSecret: config['FACEBOOK-CLIENT-SECRET'],
    callbackURL: '/oauth2/redirect/facebook',
    state: true
}, async (accessToken, refreshToken, profile, cb) => {
    console.log(profile)
    try {
        const savedUser = await users.getUser({ id: profile.id, provider: FB });
        //console.log("savedUser", savedUser);
        if (!savedUser) {
            await users.insertUser({
                id: profile.id,
                name: profile.displayName,
                provider: FB
            });
            const user = {
                id: profile.id,
                name: profile.displayName,
                provider: "Facebook"
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
        console.log("in serialize user", user);

        cb(null, { id: user.id, name: user.name, provider: user.provider });
    });
});

passport.deserializeUser((user, cb) => {
    console.log("in deserialize user", user);
    process.nextTick(() => {
        return cb(null, user);
    });
})