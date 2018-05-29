require('dotenv').config()
const Server = require('socket.io')
// const FrontServer = require('./src/server/frontServer/FrontServer.js')
// const LobbyServer = require('./src/server/lobbyServer/LobbyServer.js')
// const GameServer = require('./src/server/gameServer/GameServer.js')
const TestServer = require('./src/server/TestServer/TestServer')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(process.env.DB, { useMongoClient : true , promiseLibrary : require('bluebird') } )
.then(() => console.log('DB Connect Successful')).catch((err) => console.log('DB Error : ' + err))

// const globalFrontServer = new FrontServer(new Server(process.env.FRONTPORT))
// // 한국 서버
// const koGameServer = new GameServer(new Server(process.env.KOGAMEPORT ), 'KOREA')
// const koLobbyServer = new LobbyServer(new Server(process.env.KOLOBBYPORT), 'KOREA', koGameServer)

const koTestServer = new TestServer(new Server(process.env.KOTESTPORT))


