// function
const checkVersion = require('./function/checkVersion.js')
const auth = require('./function/auth.js')

// util
const disconnectSocket = require('../../util/disconnectSocket.js')

class server {
  constructor(io) {
    console.log('Front Server On!')
    io.on('connect', socket => {
      console.log('server connected. id : ', socket.id)
      checkVersion(socket)
      .then(auth)
      .catch(reason => disconnectSocket(socket, reason))
      socket.on('disconnect', () =>
        console.log('User Disconnected : ', socket.id)
      )
    })
  }
}

module.exports = server

