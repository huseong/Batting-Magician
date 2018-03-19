// function
const checkVersion = require('./function/checkVersion.js')
const auth = require('./function/auth.js')

// util
const disconnectSocket = require('../../util/disconnectSocket.js')

class server {
  constructor(io) {
    console.log('Front Server On!')
    io.on('connect', socket => {
      console.log('server connected. id : ', socket.id)
      checkVersion(socket)
      .then(auth)
      .then(user => this.toLobbyServer(socket, user))
      .catch(reason => disconnectSocket(socket, reason))
      socket.on('disconnect', () =>
        console.log('User Disconnected : ', socket.id)
      )
    })
  }

  // TODO: 유저를 로비서버로 보낸다.
  toLobbyServer (socket, user) { 
    new Promise((resolve, reject) => {
      user.info.status = 'Lobby' // 유저의 상태를 로비로 바꿔놓는다.
      user.save(err => {
        if(err) {
          Error.create('User DB Error')
          return reject('DB Error')
        }
        socket.emit('to lobby server')
        setTimeout(() => reject('disconnect from front'), 1000) // 1초 뒤에 연결을 종료함
      })
    })
  }

}

module.exports = server

