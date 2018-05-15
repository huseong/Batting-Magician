/* TODO:
유저로부터 닉네임을 받아 가입을 한다.
*/
const User = require('../../../model/user/user.model.js')
const Crack = require('../../../model/etc/crack.model.js')
const signUpRegex = /^[가-힣0-9 ]{2,8}$|^[a-zA-Z0-9]{2,13}$/
module.exports = (socket, id) => 
  new Promise((resolve, reject) => {
    socket.emit('create sign up form')
    socket.on('sign up', ({name}) => {
      if(!signUpRegex.test(name)) { // 조건에 맞는 이름인지 확인해본다.
        Crack.create('Name Status Hack', id)
        return reject('crack')
      }
      User.find({'meta.name' : name}, (err, user) => {
        // 만약 해당 이름을 가진 유저가 이미 존재한다면
        if(user)
          return socket.emit('name overlap')
        // 그렇지 않는다면
        socket.removeAllListeners('sign up')
        User.create(id, name).then(user => {
          resolve({socket : socket, user : user})
        }).catch(reason => reject(socket))
      })
    })
  })