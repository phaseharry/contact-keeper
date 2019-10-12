const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const { check, validationResult } = require('express-validator')

const User = require('../models/User')

/* 
  @route           POST api/users
  @description     Register a user
  @access          Public
*/
router.post('/', [
  check('name', 'Name is required').not().isEmpty(), // name is a key in the req.body
  check('email', 'Please include a valid email').isEmail(), // email is a key in the req.body
  check('password', 'Please enter a password with 6 or more characters').isLength({ // password is a key in the req.body
    min: 6
  })
  /*
    the check and validationResult are functions from the express-validator library that basically provides middleware functions that
    check and validate the body of the request to ensure that it passes your validations. If it passes then the req.body object will just
    be passed along to the next middleware (i.e., the action you want to do with that req.body object). If it passes then it will pass an error 
    along, hoping that your error handler will handle and send that error to the frontend 
  */
], async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) { // we want empty to be true (no errors) so if it's true, we bang it out to false so this 'if' condition will run
    return res.status(400).json({ errors: errors.array() }) // errors.array() method returns an array of the errors 
  }

  const { name, email, password } = req.body

  try {
    let user = await User.findOne({ email })

    if (user) { // checks if user already exists. if they do we send a 400 for bad request because this route is for creating a new user
      return res.status(400).json({ msg: 'User already exists' })
    }

    user = new User({ // not saved in database yet, only a user instance has been created
      name,
      email,
      password
    })

    const salt = await bcrypt.genSalt(10) // takes in a value to determine how secure the salting is

    user.password = await bcrypt.hash(password, salt) // bcrypt.hash method takes the plaintext password and the salt to then return a hash of the password and we store that in the database
    await user.save() // saving the user instance in our database

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 360000
    }, (err, token) => {
      if (err) throw err
      res.json({ token })
    })

  } catch (err) {
    console.error(err.message)
    next(err)
  }
})

module.exports = router