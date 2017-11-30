require('dotenv').config()
const Server = require('socket.io')
const mainServer = require('./src/test.js')

mainServer(new Server(process.env.PORT))