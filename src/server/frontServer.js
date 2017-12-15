const checkVersion = require('./frontServer/checkVersion.js')
const auth = require('./frontServer/auth.js')

module.exports = io => {
  console.log('Front Server On!')
  io.on('connect', socket => {
    console.log('server connected. id : ', socket.id)
    checkVersion(socket)
    .then(auth)
    .catch(socket => socket.disconnect(true))
    socket.on('disconnect', () =>
      console.log('User Disconnected : ', socket.id)
    )
  })
}