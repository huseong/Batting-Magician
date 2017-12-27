const User = require('../model/user.js')
const Slime = require('../class/slime.js')
const StandardMatch = require('../model/standardMatch.js')

const matchTypes = ['Standard', 'Middle', 'Custom', 'Solo']
module.exports = io => {
  console.log('Game Server On!')
  io.on('connect', socket => {
    // User.checkUser(socket, 'Game')
    // .then((socket, user) => {
    //   if(!user.info.matchType || !user.info.room || matchTypes.indexOf(user.info.matchType) === -1)      
    // })
  })
}
