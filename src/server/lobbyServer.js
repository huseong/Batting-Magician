const User = require('../model/user.js')
const standardMatch = require('./lobbyServer/standard/standardMatch.js')
module.exports = io => {
  console.log('Lobby Server On!')
  io.on('connect', socket => {
    User.checkStatus(socket, 'Lobby')
    .then(standardMatch) // 50명을 정원으로 하는 표준 경기
    .then(soloGame) // 혼자서 하는 경기
    .catch(socket => socket.disconnect(true))
  })
}