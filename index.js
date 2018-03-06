require('dotenv').config()
const Server = require('socket.io')
const serverUrl = './src/server/'
const frontServer = require(serverUrl + 'frontServer/main.js')
const lobbyServer = require(serverUrl + 'lobbyServer/main.js')
// const gameServer = require(serverUrl + 'gameServer/main.js')
const roomServer = require(serverUrl + 'roomServer/main.js')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(process.env.DB, { useMongoClient : true , promiseLibrary : require('bluebird') } )
.then(() => console.log('DB Connect Successful')).catch((err) => console.log('DB Error : ' + err))

const globalFrontServer = new frontServer(new Server(process.env.FRONTPORT))
// 한국 서버
const koRoomServer = new roomServer(new Server(process.env.KOROOMPORT), 'KOREA')
const koLobbyServer = new lobbyServer(new Server(process.env.KOLOBBYPORT), 'KOREA', koRoomServer)
// gameServer(new Server(process.env.KOGAMEPORT))


