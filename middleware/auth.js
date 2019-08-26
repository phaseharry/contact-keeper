const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  // Get token from the header
  const token = req.header('x-auth-token') // accessing the x-auth-token key within the header to get its value (the token)

  // Check if token exists
  if(!token){
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret')) // decoding the token to get our user id

    req.user = decoded.user // storing the decoded user payload in the request object so any routes that comes after this middleware will have access to it
    next() 
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' })
  }
}