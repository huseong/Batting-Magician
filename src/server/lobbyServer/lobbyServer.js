// model
const User = require('../../model/user/user.model.js')
const Error = require('../../model/etc/error.model.js')

// manager
const roomGameManager = require('./function/roomGameManager.js') // 방에서 하는 게임을 관리하는 매니저이다.
const ArenaManager = require('./arena/arenaManager.js') // 아레나 게임을 관리하는 매니저이다.

//function
const resUserInfo = require('./function/resUserInfo.js')
const disconnectUser = require('./function/disconnectUser.js')
const disconnectSocket = require('../../util/disconnectSocket.js')

class Server {
  constructor(io, serverName, gameServer) {
    console.log('Lobby Server Name ' + serverName + ' On!')
    this.arenaManager = new ArenaManager(io, serverName, gameServer)
    this.gameServer = gameServer
    this.serverName = serverName
    io.on('connect', this.connectUser)
  }

  connectUser(socket) {
    console.log('user connected in Lobby Server : ', socket.id)
    User.checkStatus(socket, 'Lobby') // 유저가 로비에 있어도 되는 유저인지 확인한다.
    .then(resUserInfo(socket, user, this.serverName))
    .catch(reason => disconnectSocket(socket, reason))
    this.arenaManager.connectSocket(socket)
    socket.on('disconnect client', () => disconnectUser(socket))
    socket.on('disconnect', () => console.log('user Disconnected : ' + socket.id))
  }
}

module.exports = Server
