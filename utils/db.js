const mongoose = require('mongoose');
if (process.env.NODE_ENV !== "production") {
   require('dotenv').config()
}

const connectDB = () => {
   console.log(process.env.MONGOURI)
   mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
         console.log("Connected to Mongo")
      })
      .catch(err => {
         console.log("Couldn't connect to Mongo")
         console.log(err)
      })
}

module.exports = connectDB;