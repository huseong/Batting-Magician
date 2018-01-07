// model 
const User = require('../../../model/user.js')
const Hack = require('../../../model/hack.js')

// class
const RoomMatch = require('../../../model/roomMatch.js')

// server
const RoomServer = require('../../roomServer.js') 

module.exports = (socket, param, roomServer) => 
  new Promise((resolve, reject) => {
    if(!socket.user)
      reject('can not find user')
    if(!socket.server)
      reject('can not find server')
    User.checkStatus(socket, 'Lobby')
    .then(user => new Promise((resolve, reject) => {
      if(!(1 < param.name.length && param.name.length < 13))
        Hack.create('Name Over in Create Room')
        return reject('Client Hack')
      if(!(1 < param.count && param.count < 37)) {
        Hack.create('Count Over in Create Room')
        return reject('Client Hack')
      }
      socket.emit('room making start')
      const match = await RoomMatch.create(socket.server, param)
      user.info.status = 'Room'
      user.info.room.roomID = match.meta.id
      RoomServer.assignNewMatch(match)
      .then(() => {
        user.save(err => {
          if(!err) {
            socket.emit('to room scene') // room scene으로 이동하라고 보내준다.
          }
        })
      })

    }))
    .catch(reject)
  })