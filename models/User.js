const mongoose = require('mongoose')

/* 
  A schema is basically a skeleton for all data instances that will be created 
  pertaining to this particular class of data
*/
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date, 
    default: Date.now() // date.now() will put the current time as the date key-value when the user gets created automatically
  }
})

// mongoose.model takes in a model name and a schema to define how data created with that model will look like
module.exports = mongoose.model('user', UserSchema)