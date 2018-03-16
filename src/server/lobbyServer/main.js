// model
const User = require('../../model/user.js')
const Error = require('../../model/error.js')

// manager
// const standardMatchManager = require('./lobbyServer/standardMatchManager.js')
const roomGameManager = require('./function/roomGameManager.js') // 방에서 하는 게임을 관리하는 매니저이다.

//function
const disconnectUser = require('./function/disconnectUser.js')
const disconnectSocket = require('../../util/disconnectSocket.js')

class server {
  constructor(io, serverName, roomServer) {
    console.log('Lobby Server Name ' + serverName + ' On!')
    io.on('connect', socket => {
      console.log('user connected in Lobby Server : ', socket.id)
      User.checkStatus(socket, 'Lobby') // 유저가 로비에 있어도 되는 유저인지 확인한다.
      .then(user => this.resUserInfo(socket, user))
      .catch(reason => disconnectSocket(socket, reason))
      socket.on('disconnect client', () => disconnectUser(socket))
      socket.on('disconnect', () => console.log('user Disconnected : ' + socket.id))
    })
  }

  resUserInfo(socket, user) {
    new Promise(resolve => {
      socket.user = user
      socket.server = serverName
      socket.emit('user data', user.sendData())
      resolve()
    })
  }
}

module.exports = server
