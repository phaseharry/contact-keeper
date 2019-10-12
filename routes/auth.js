const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const { check, validationResult } = require('express-validator')

const auth = require('../middleware/auth')
const User = require('../models/User')

/* 
  @route           GET api/users
  @description     Get logged-in user
  @access          Private
*/
router.get('/', auth, async (req, res, next) => {
  console.log(req.user)
  try {
    const user = await User.findById(req.user.id).select('-password') // find and return all user information except for the password
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

/* 
  @route           POST api/users
  @description     Authenticate user & get token
  @access          Public
*/
router.post('/', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    // bcrypt.compare is comparing the plaintext password from the req.body to the salted one in our database. If they match then it returns true or false depending on matching or not
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' })
    }

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
    res.status(500).send('Server Error')
  }
})

module.exports = router