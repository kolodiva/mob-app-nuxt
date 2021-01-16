const express = require('express')
const cookieParser = require('cookie-parser')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const https = require('https')

app.use(cookieParser())

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  if (process.env.NODE_ENV == 'production') {
    host = 'localhost'; port = 6000;
  } else {
    //const { host, port } = nuxt.options.server;
    host = '192.168.1.41'; port = 3000;
  }

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  //https.createServer(nuxt.options.server.https, app).listen(port, host)
  if (process.env.NODE_ENV == 'production') {
    app.listen(port, host)
    consola.ready({
      message: `Server listening on https://${host}:${port}`,
      badge: true,
    })
  } else {
    app.listen(port, host)
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true,
    })
  }
}
start()
