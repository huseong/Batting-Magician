require('dotenv').config()
const Server = require('socket.io')
const serverUrl = './src/server/'
const frontServer = require(serverUrl + 'frontServer.js')
const lobbyServer = require(serverUrl + 'lobbyServer.js')
const gameServer = require(serverUrl + 'gameServer.js')
const roomServer = require(serverUrl + 'roomServer.js')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(process.env.DB, { useMongoClient : true , promiseLibrary : require('bluebird') } )
.then(() => console.log('DB Connect Successful')).catch((err) => console.log('DB Error : ' + err))

frontServer(new Server(process.env.FRONTPORT))
// 한국 서버
const koRoomServer = new roomServer(new Server(process.env.KOROOMPORT), 'KOREA')
const koLobbyServer = new lobbyServer(new Server(process.env.KOLOBBYPORT), 'KOREA', koRoomServer)
// gameServer(new Server(process.env.KOGAMEPORT))


