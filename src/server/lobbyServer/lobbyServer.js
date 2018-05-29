// model
const User = require('../../model/user/user.model.js')
const Error = require('../../model/etc/error.model.js')

// manager
const ArenaManager = require('./arena/arenaManager.js') // 아레나 게임을 관리하는 매니저이다.

//function
const setSocket = require('./function/setSocket.js')
const disconnectSocket = require('../../util/disconnectSocket.js')

class LobbyServer {
  constructor(io, serverName, gameServer) {
    console.log('Lobby Server ' + serverName + ' On!')
    this.arenaManager = new ArenaManager(io, serverName, gameServer)
    this.gameServer = gameServer
    this.serverName = serverName
    io.on('connect', socket => this.connectUser(socket))
  }

  connectUser(socket) {
    console.log('user connected in Lobby Server : ', socket.id)
    User.checkStatus(socket, 'Lobby') // 유저가 로비에 있어도 되는 유저인지 확인한다.
    .then(user => setSocket(socket, user, this.serverName, this.arenaManager))
    .catch(reason => disconnectSocket(socket, reason))
  }
}

module.exports = LobbyServer
