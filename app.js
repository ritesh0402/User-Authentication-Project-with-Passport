const express = require('express');
const app = express();
const session = require('express-session');
const loginRoute = require('./routes/login')
const logoutRoute = require('./routes/logout')
const registerRoute = require('./routes/register')
const connectDB = require('./utils/db');
const localStrategy = require('passport-local');
const passport = require('passport');
const userModel = require('./models/user');
const isLoggedIn = require('./utils/isLoggedIn');
const MongoStore = require('connect-mongo')

const store = MongoStore.create({
   mongoUrl: process.env.MONGOURI,
   touchAfter: 24 * 60 * 60,
   crypto: { secret: 'codeword' }
})

store.on("error", function (err) {
   console.log('store error')
   console.log(err)
})

connectDB();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));

const sessionOpt = { store, secret: 'codeword', resave: false, saveUninitialized: false }
app.use(session(sessionOpt));

app.use(passport.initialize())
app.use(passport.session())

passport.use(new localStrategy(userModel.authenticate()))
passport.serializeUser(userModel.serializeUser())
passport.deserializeUser(userModel.deserializeUser())

app.use((req, res, next) => {
   res.locals.currentUser = req.user;
   next()
})

app.use('/login', loginRoute)
app.use('/logout', logoutRoute)
app.use('/register', registerRoute)

app.get('/', (req, res) => {
   res.send('home')
})

app.get('/secret', isLoggedIn, (req, res) => {

   res.render('secret')
})


app.listen(3000, (err) => {
   if (err) {
      console.log(`An Error Occured: ${err}`);
   } else {
      console.log("Serving your App")
   }
})