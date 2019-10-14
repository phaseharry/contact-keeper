const express = require('express')
const connectDB = require('./config/db')

const app = express()
// Connect Database
connectDB(app)

// Init Middleware
app.use(express.json({ extended: false })) 
/* 
  express.json() is a body parsing middleware that parses through json so you can use JS to grab data from req.body in routes 
  basically replaced the third-party "body-parser" middleware
*/


app.get('/', (req, res, next) => {
  res.json({ msg: 'Hello' })
})

// Define Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

app.use((err, req, res, next) => {
  const status = err.status || 500
  const msg = err.message || 'Server error'
  console.log(status)
  console.log('error handler taking care of the error response')
  res.status(status).send(msg)
})

const PORT = process.env.PORT || 5000

app.on('ready', () => {
  app.listen(PORT, () => console.log(`server started on port ${PORT}`))
})

module.exports = app