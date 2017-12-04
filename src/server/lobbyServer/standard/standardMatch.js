/* TODO: matching 풀에 유저 등록, 또는  */
const User = require('../../model/user')
const createStandardMatch = require('./createStandardMatch.js')
const matchingUsers = []
var lastRoomID = require('../../../model/server.js')
module.exports = socket => {
  socket.on('add standard pool', () => {
    User.checkStatus(socket, 'Lobby')
    .then((socket, user) => {
      user.info.status = 'Matching'
      socket.user = user
      matchingUsers.push(socket)
      if(matchingUsers.length === 50) {
        createStandardMatch(matchingUsers)
        .then(clearMatchingUsers)
      }
    })
  })
}

const clearMatchingUsers = () => {
  matchingUsers = []
}