const router = require('express').Router()

/* 
  @route           GET api/contacts
  @description     Get all users contacts
  @access          Private
*/
router.get('/', (req, res, next) => {
  res.send('Getting contacts')
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