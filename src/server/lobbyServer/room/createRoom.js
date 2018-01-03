// TODO: 방을 만드는 경우

const User = require('../../../model/user.js')
const Hack = require('../../../model/hack.js')

module.exports = (socket, param) => 
  new Promise((resolve, reject) => {
    if(!socket.user)
      reject('can not find user')
    User.checkStatus(socket, 'Lobby')
    .then(user => new Promise((resolve, reject) => {
      if(!(1 < param.roomName.length < 13))
        return socket.emit('room name too long')
      if(!(1 < param.count < 41)) {
        Hack.create('Count Over in Create Room')
        reject('Client Hack')
      }
        
    }))
    .catch(reject)
  })