const express = require('express');
const router = express.Router();
const userModel = require('../models/user');

router.route('/')
   .get((req, res) => {
      res.render('register')
   })
   .post(async (req, res) => {
      try {
         const { email, username, password } = req.body;
         const user = new userModel({ email, username })
         const newUser = await userModel.register(user, password)
         req.login(newUser, (err) => {
            if (err) {
               return next(err)
            } else {
               console.log('Registered')
               res.redirect('/secret')
            }
         })
      } catch (e) {
         console.log(e.message);
      }
   })


module.exports = router;