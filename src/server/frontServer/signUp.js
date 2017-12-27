/* TODO:
유저로부터 닉네임을 받아 가입을 한다.
*/
const User = require('../../model/user.js')
const signUpRegex = /^[가-힣0-9]{2,8}$|^[a-zA-Z0-9]{2,13}$/
module.exports = (socket, id) => 
  new Promise((resolve, reject) => {
    socket.emit('create sign up form')
    socket.on('sign up', ({name}) => {
      if(!signUpRegex.test(name))
        return socket.emit('name error')
      socket.removeAllListeners('sign up')
      let user = User.create(id, name).catch(() => reject(socket))
      resolve(socket, user)
    })
  })