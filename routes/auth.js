const router = require('express').Router()

/* 
  @route           GET api/users
  @description     Get logged-in user
  @access          Private
*/
router.get('/', (req, res, next) => {
  res.send('Get logged-in user')
})

/* 
  @route           POST api/users
  @description     Authenticate user & get token
  @access          Public
*/
router.post('/', (req, res, next) => {
  res.send('Auth in user')
})

module.exports = router