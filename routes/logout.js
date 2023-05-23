const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
   req.logout(function (err) {
      if (err) {
         return next(err);
      }
      console.log('success logout');
      res.redirect('/login');
   });
});

module.exports = router;