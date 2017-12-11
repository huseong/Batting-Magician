/* TODO: matching 풀에 유저 등록, 또는  */
const User = require('../../../model/user.js')
const createStandardMatch = require('./createStandardMatch.js')
const matchingUsers = []
const waitingMatches = []
const maxStandardMatch = 50
var lastRoomID = require('../../../model/server.js')
module.exports = socket => {
  socket.on('add standard pool', () => {
    User.checkStatus(socket, 'Lobby')
    .then((socket, user) => {
      user.info.status = 'Matching'
      socket.user = user
      matchingUsers.push(socket)
      waitingMatches.forEach(match => {
        if(match.info.users < maxStandardMatch) {
          match.info.users.push()
        }
      })
      if(matchingUsers.length === maxStandardMatch) {
        createStandardMatch(matchingUsers)
        .then(match => {
          waitingMatches.push(match)
        })
      }
    })
  })
}

const clearMatchingUsers = () => {
  matchingUsers = matchingUsers.slice(50)
}