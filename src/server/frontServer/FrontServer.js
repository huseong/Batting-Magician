// function
const checkVersion = require('./function/checkVersion.js')
const auth = require('./function/auth.js')
const toLobbyServer = require('./function/toLobbyServer.js')

// util
const disconnectSocket = require('../../util/disconnectSocket.js')

class FrontServer {
  constructor(io) {
    console.log('Front Server On!')
    io.on('connect', socket => {
      console.log('User Connected. id : ', socket.id)
      checkVersion(socket)
      .then(auth)
      .then(user => toLobbyServer(user, socket))
      .catch(reason => disconnectSocket(socket, reason))
      socket.on('disconnect', () =>
        console.log('User Disconnected : ', socket.id)
      )
    })
  }
}

module.exports = FrontServer

