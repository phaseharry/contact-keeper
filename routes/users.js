const router = require('express').Router()

/* 
  @route           POST api/users
  @description     Register a user
  @access          Public
*/
router.post('/', (req, res, next) => {
  res.send('Registers a user')
})

module.exports = router