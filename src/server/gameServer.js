const User = require('../model/user.js')
const Slime = require('../server/gameServer/slime.js')
module.exports = io => {
  console.log('Game Server On!')
  io.on('connect', socket => {
    // User.checkStatus(socket, 'Lobby')
    // .then((socket, user) => {
      
    // })
    socket.join('1000')
    let slimeArray = [...Array(8)].map((slime, index) => new Slime(io, '1000', index))
    slimeArray.forEach(slime => {
      slime.start()
    })
  })
}

