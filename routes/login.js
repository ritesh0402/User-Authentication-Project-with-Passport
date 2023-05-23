const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const passport = require('passport');

router.route('/')
   .get('/', (req, res) => {
      res.render('login')
   })
   .post('/', passport.authenticate('local', { failureRedirect: '/login' }), async (req, res) => {
      console.log('Successful login')
      res.redirect('/secret')
   })


module.exports = router;