const User = require('../model/user.js')
const Slime = require('../class/slime.js')

module.exports = io => {
  console.log('Game Server On!')
  io.on('connect', socket => {
    socket.join('1000')
  })
}
