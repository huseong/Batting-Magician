const User = require('../model/user.js')
const Slime = require('../server/gameServer/ingame/slime.js')
module.exports = io => {
  console.log('Game Server On!')
  io.on('connect', socket => {
    User.checkStatus(socket, 'Game')
    .then((socket, user) => {
      
    })
  })

  async function a () {
    slimeArray = await [...Array(8)].map((slime, index) => new Slime(io, '1000', index))
  }
}

