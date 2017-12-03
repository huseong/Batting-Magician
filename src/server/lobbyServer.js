const User = require('../model/user.js')
const standardMatch = require('./lobbyServer/standardMatch.js')
module.exports = io => {
  console.log('Lobby Server On!')
  standardMatch()
  io.on('connect', socket => {
    user.checkStatus(socket, 'Lobby')
    .then()
    .catch(socket => socket.disconnect(true))
  })
}