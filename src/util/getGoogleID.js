// TODO: 소켓으로부터 googleID를 받는다.
module.exports = socket =>
  new Promise((resolve, reject) => {
    socket.emit('get google')
    socket.on('get google', ({id}) => {
      return resolve(id)
    })
  })