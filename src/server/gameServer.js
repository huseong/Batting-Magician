const User = require('../model/user.js')

module.exports = io => {
  console.log('Game Server On!')
  io.on('connect', socket => {
    User.checkStatus(socket, 'Lobby')
    .then((socket, user) => {
      
    })
  })
}

