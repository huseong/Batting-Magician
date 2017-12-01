const checkVersion = require('./frontServer/checkVersion.js')
const getGoogleID = require('./frontServer/getGoogleID.js')

module.exports = io => {
  console.log('Front Server On!')
  io.on('connect', socket => {
    checkVersion(socket)
    .then(getGoogleID)
    .catch(socket => socket.disconnect(true))
  })
}