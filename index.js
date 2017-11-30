require('dotenv').config()
const Server = require('socket.io')
const frontServer = require('./src/server/frontServer.js')
const lobbyServer = require('./src/server/lobbyServer.js')

frontServer(new Server(process.env.FRONTPORT))
lobbyServer(new Server(process.env.LOBBYPORT))

