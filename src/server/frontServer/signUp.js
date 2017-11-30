/* TODO:
유저로부터 닉네임을 받아 가입을 한다.
*/
const User = require('../../model/user.js')

module.exports = (socket, id) => 
  new Promise((resolve, reject) => {
    socket.emit('create sign up form')
    socket.on('sign up', ({name}) => {
      User.create(id, name)
      resolve(socket)
    })
  })