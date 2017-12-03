/* TODO: matching 풀에 유저 등록, 또는  */
const User = require('../../model/user')
const matchingUsers = []
const s
module.exports = socket => {
  socket.on('add standard pool', () => {
    User.checkStatus(socket, 'Lobby')
    .then((socket, user) => {
      user.info.status = 'Matching'
      matchingUsers.push(socket)
      if(matchingUsers.length === 50) {
        
      }
    })
  })
}