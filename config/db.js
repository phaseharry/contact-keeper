const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')
/*
  config allows us to store variables inside the /config/default.json file and have access it within our entire application.
  In line 3, we're using config to return the mongoURI key we stored inside the default.json file
  @param {import('express').Express} expressApp
*/

const connectDB = expressApp => {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then(() => {
      expressApp.emit('ready')
      console.log('MongoDB Connected')
    })
    .catch(err => {
      console.error(err.message)
      process.exit(1)
    })
}

module.exports = connectDB