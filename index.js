require('dotenv').config()
const Server = require('socket.io')
const serverUrl = './src/server/'
const frontServer = require(serverUrl + 'frontServer.js')
const lobbyServer = require(serverUrl + 'lobbyServer.js')
const gameServer = require(serverUrl + 'gameServer.js')

frontServer(new Server(process.env.FRONTPORT))
lobbyServer(new Server(process.env.LOBBYPORT))
gameServer(new Server(process.env.GAMEPORT))

