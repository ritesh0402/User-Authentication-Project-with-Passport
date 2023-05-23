const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      requires: [true, 'Username cannot be blank'],
      unique: true
   }
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema)