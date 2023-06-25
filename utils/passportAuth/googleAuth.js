var GoogleStrategy = require('passport-google-oauth20').Strategy;
var passport = require('passport');
const users = require("../../db/models/users")
const config = require("../../config")
const GOOGLE_URL = 'https://www.google.com'


passport.use(new GoogleStrategy({
    clientID: config["GOOGLE-CLIENT-ID"],
    clientSecret: config["GOOGLE-CLIENT-SECRET"],
    callbackURL: "/oauth2/redirect/google"
},
    async (accessToken, refreshToken, profile, cb) => {
        console.log(profile)
        try {
            const savedUser = await users.getUser({ id: profile.id, provider: GOOGLE_URL });
            //console.log("savedUser", savedUser);
            if (!savedUser) {
                await users.insertUser({
                    id: profile.id,
                    name: profile.displayName,
                    provider: GOOGLE_URL,
                    picture: profile.photos[0].value,
                    locale: profile._json.locale

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
            console.log(error, "While Google-login");
            return cb(error);
        };
    }
));