// Import required modules
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Passport configuration for OAuth
passport.use(new OAuth2Strategy({
    authorizationURL: 'https://www.yourauthorizationurl.com', // replace with your OAuth provider's authorization URL
    tokenURL: 'https://www.yourtokenurl.com', // replace with your OAuth provider's token URL
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/callback" // replace with your callback URL
},
function(accessToken, refreshToken, profile, cb) {
    // In a real application, you'd typically look up the user in your database here
    // For this example, we'll just return the profile
    return cb(null, profile);
}
));

// Serialize and deserialize user instances to and from the session
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

// Function to setup security
function setup(app) {
    // Initialize Passport and restore authentication state, if any, from the session
    app.use(passport.initialize());
    app.use(passport.session());

    // Define routes for OAuth
    app.get('/auth', passport.authenticate('oauth2'));
    app.get('/auth/callback', 
        passport.authenticate('oauth2', { failureRedirect: '/login' }),
        function(req, res) {
            // Successful authentication, redirect home
            res.redirect('/');
        }
    );
}

module.exports = {
    setup
};
