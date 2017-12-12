const User = require('../../model/user.js')
require('date-utils')
module.exports = socket => 
  new Promise((resolve, reject) => {
    socket.on('enter bank', () => {
      User.checkStatus(socket, 'Lobby')
      .then((socket, user) => {
        socket.emit('bank info', user.bank)
      })
      .catch(reject)
    })
    socket.on('save money', param => {
      User.checkStatus(socket, 'Lobby')
      .then()
    })
    resolve(socket)
  })