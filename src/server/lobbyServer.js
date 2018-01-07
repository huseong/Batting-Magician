// model
const User = require('../model/user.js')
const Error = require('../model/error.js')

// manager
const standardMatchManager = require('./lobbyServer/standardMatchManager.js')
const roomManager = require('./lobbyServer/room/roomGameManager.js')

//function
const disconnectUser = require('./lobbyServer/disconnectUser.js')
const disconnectSocket = require('../util/disconnectSocket.js')

module.exports = (io, server) => {
  console.log('Lobby Server On!')
  io.on('connect', socket => {
    console.log('user connected in Lobby Server : ', socket.id)
    const setUser = user => 
      new Promise((resolve, reject) => {
        socket.user = user
        socket.server = server
        socket.emit('user data', user.sendData())
        roomManager(socket).catch(reject)
        standardMatchManager(socket).catch(reject)
      })
    User.checkStatus(socket, 'Lobby') // 유저가 로비에 있어도 되는 유저인지 확인한다.
    .then(setUser)
    .catch(disconnectSocket)
    socket.on('disconnect client', () => disconnectUser(socket))
  })}
