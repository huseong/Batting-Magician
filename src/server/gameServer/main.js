
// model
const User = require('../../model/user.js')
const Arena = require('../../model/arena.js')
const Hack = require('../../model/hack.js')

// function
const disconnectSocket = require('../../util/disconnectSocket.js')

class server {
  constructor(io) {
    io.on('connect', socket => {
      User.checkStatus(socket, 'game')
      .then(user => this.checkUserGame(user, socket))
    })
  }

  checkUserGame (user, socket) {
    socket.emit('req user game id') // 유저의 게임 id를 요청한다. 받은 값과 실제 아레나에서의 값을 비교해야한다.
    socket.on('res user game id', ({ id : id }) => {
      Arena.find({'meta.id' : id }, arena => {
        if(!arena) {
          
        }
      })
    })
  }
}