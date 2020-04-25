import express from 'express'
const app = express()

// Require API routes
const pg = require('./routes/db')

// Import API Routes
app.use(pg)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}

export default {
  path: '/api',
  handler: app
}
