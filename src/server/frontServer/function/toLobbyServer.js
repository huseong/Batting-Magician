const Error = require('../../../model/etc/error.model.js')

module.exports = (socket, user) => 
  new Promise((resolve, reject) => {
    user.meta.status = 'Lobby' // 유저의 상태를 로비로 바꿔놓는다.
    user.save(err => {
      if(err) {
        Error.create('User DB Error')
        return reject('DB Error')
      }
      socket.emit('to lobby server') // 클라이언트에게 로비 서버로 이동하도록 명령한다.
      setTimeout(() => reject('disconnect from front'), 3000)
    })
  })