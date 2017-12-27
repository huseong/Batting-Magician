require('dotenv').config()
const Server = require('socket.io')
const serverUrl = './src/server/'
const frontServer = require(serverUrl + 'frontServer.js')
const lobbyServer = require(serverUrl + 'lobbyServer.js')
const gameServer = require(serverUrl + 'gameServer.js')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(process.env.DB, { useMongoClient : true , promiseLibrary : require('bluebird') } )
.then(() => console.log('DB Connect Successful')).catch((err) => console.log('DB Error : ' + err))

frontServer(new Server(process.env.FRONTPORT))
lobbyServer(new Server(process.env.KOLOBBYPORT))
gameServer(new Server(process.env.KOGAMEPORT))

