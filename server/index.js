require('dotenv').config();
const express = require('express')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')

const app = express();

const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING
} = process.env

massive(CONNECTION_STRING).then( db =>{
    app.set('db', db);
    app.listen(SERVER_PORT, () => console.log(`Hear the beautiful music on port ${SERVER_PORT}`))
});

app.use( session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use( new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile email'
}, 
function(accessToken, refreshToken, extraParams, profile, done){
    const db = app.get('db')
    const {id, displayName, picture} = profile;
    // db.find_user([id]).then( user => {
        //     if(users[0]){
            //         return done(null, users[0].id)
            //     }else{
                //         db.create_user([displayName, picture, id]).then( createdUser =>{
                    //             return done( null, createdUser[0].id)
                    //         })
                    //     }
                    // })
    console.log(profile)
    return done(null, id)
}))

passport.serializeUser(( id, done) =>{
    console.log(id)
    return done( null, id )
})
passport.deserializeUser((id, done) => {
        return done(null, id)
})

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/dashboard',
    failureRedirect: 'http://localhost:3000/#/'
}))

app.get('/auth/me', function(req,res) {
    if(req.user){
        res.status(200).send(req.user)
    }else{
        res.sendStatus(401)
    }
})
app.get('/logout', function(req, res) {
    req.logOut();
    res.redirect('http://localhost:3000/#/')
})