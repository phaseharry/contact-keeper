const router = require('express').Router()
const { check, validationResult } = require('express-validator/check')

const auth = require('../middleware/auth')
const User = require('../models/User')
const Contact = require('../models/Contact')
/* 
  @route           GET api/contacts
  @description     Get all users contacts
  @access          Private
*/
router.get('/', auth, async(req, res, next) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 })
    res.json(contacts)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

/* 
  @route           POST api/contacts
  @description     Add a contact
  @access          Private
*/
router.post('/', (req, res, next) => {
  res.send('Adding a new contact')
})

/* 
  @route           PUT api/contacts/:id
  @description     Update a contact
  @access          Private
*/
router.put('/:id', (req, res, next) => {
  // req.params.id
  res.send('Update a contact')
})

/* 
  @route           DELETE api/contacts/:id
  @description     Deleting a contact
  @access          Private
*/
router.delete('/:id', (req, res, next) => {
  // req.params.id
  res.send('Contact destroyed')
})

module.exports = router