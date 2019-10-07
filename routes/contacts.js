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
router.get('/', auth, async (req, res, next) => {
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
router.post('/', [auth, [  // storing multiple middlewares within the array. 
  check('name', 'Name is required').not().isEmpty()
]], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { name, email, phone, type } = req.body
  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      type,
      user: req.user.id
    })

    const contact = await newContact.save()
    res.json(contact)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

/* 
  @route           PUT api/contacts/:id
  @description     Update a contact
  @access          Private
*/
router.put('/:id', auth, async (req, res, next) => {
  const { name, email, phone, type } = req.body

  // Build contact object
  const contactFields = {}
  if (name) contactFields.name = name
  if (email) contactFields.email = email
  if (phone) contactFields.phone = phone
  if (type) contactFields.type = type

  try {
    let contact = await Contact.findById(req.params.id)

    if (!contact) return res.status(404).json({ msg: 'Contact not found' })

    // Make sure user owns contact
    console.log(contact.user)
    if (contact.user.toString() !== req.user.id) { // req.user.id is the user object that gets passed in from our auth middleware 
      // the user key is an object value that it the id of the user. Calling the .toString() method will turn it into a string
      return res.status(401).json({ msg: 'Not authorized' })
    }

    contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true }) //new: true means that if the contact doesn't exist, it will create it
    res.json(contact)
  } catch (err) {
    console.log(err.message)
    res.status(500).json('server message')
  }
})

/* 
  @route           DELETE api/contacts/:id
  @description     Deleting a contact
  @access          Private
*/
router.delete('/:id', auth, async (req, res, next) => {
  try {
    let contact = await Contact.findById(req.params.id)

    if (!contact) return res.status(404).json({ msg: 'Contact not found ' })

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' })
    }

    await Contact.findByIdAndDelete(req.params.id)
    res.json({ msg: 'Contact Removed' })
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ msg: 'server error' })
  }
})

module.exports = router