require('dotenv').config();
const express = require('express')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , sc = require('./controllers/studentController')
    , lc = require('./controllers/lessonController')
    , pc = require('./controllers/paymentsController')
    , stripe = require('stripe')(process.env.S_STRIPE_KEY)

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
app.use(express.static(__dirname + '/../build'))

app.use( bodyParser.json())
app.use( cors() )


app.use( session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

//authentication
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
    const {id, displayName, picture, emails} = profile;
    console.log(id)
    db.find_user([id]).then( users => {
            if(users[0]){
                console.log(users[0].user_id)
                    return done(null, users[0].user_id)
            }else{                
                db.create_user([displayName, picture, id, emails[0].value]).then( createdUser =>{
                    return done( null, createdUser[0].user_id)
                })
            }
        })
}))

passport.serializeUser(( user_id, done) =>{
    return done( null, user_id )
})
passport.deserializeUser((user_id, done) => {
    app.get('db').find_session_user([user_id]).then(user => {
        return done(null, user[0])
    })
})
app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: process.env.SUCCESS_REDIRECT,
    failureRedirect: process.env.FAILURE_REDIRECT
    //successRedirect: 'http://localhost:3000/#/dashboard',
    //failureRedirect: 'http://localhost:3000/#/'
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
    res.redirect(process.env.FAILURE_REDIRECT)
    // res.redirect('http://localhost:3000/#/')
})

// user information endpoints


// student information enpoints
app.get('/students/:user_id', sc.getStudents);
app.get('/student/:student_id', sc.getStudent)
app.post('/student/add', sc.addStudent);
app.put('/student/:student_id', sc.updateStudent);
app.delete('/student/:student_id', sc.deleteStudent);

//lesson information endpoints
app.get('/lessons/:user_id', lc.getAllLessons)
app.get('/lesson/:lesson_id', lc.getOneLesson)
app.get('/lessons/bystudent/:student_id', lc.getLessonByStudent)
app.post('/lesson/add', lc.addLesson)
app.put('/lesson/update', lc.updateLesson)
app.delete('/lesson/:lesson_id', lc.deleteLesson)

//payment information endpoints
app.get('/payments/:user_id', pc.getPaymentLessons)
app.put('/payments/checkout/:lesson_id', pc.addToCheckout)
app.put('/payments/checkout/remove/:lesson_id', pc.removeFromCheckout)
app.put('/payments/checkout/complete/:user_id', pc.completePayment)

//STRIPE
app.post('/api/charge', function(req, res){
    const db = app.get('db')
    console.log(req.body)
    const charge = stripe.charges.create({
        amount: req.body.amount,
        currency: 'usd',
        source: req.body.token.id,
        description: 'Example charge'
      })
      res.sendStatus(200) // clear out cart here
 })