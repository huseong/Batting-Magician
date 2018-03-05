// model 
const User = require('../../../model/user.js')
const Hack = require('../../../model/hack.js')

// class
const RoomMatch = require('../../../model/roomMatch.js')

// server
const RoomServer = require('../../roomServer.js')

module.exports = (socket, param, roomServer) => 
  new Promise((resolve, reject) => {
    console.log('방 만들기 요청')
    if(!socket.user)
      reject('can not find user')
    if(!socket.server)
      reject('can not find server')
    User.checkStatus(socket, 'Lobby')
    .then(user => new Promise(async function (resolve, reject) {
      if(!(param.name.length < 13))
        Hack.create('Name Over in Create Room')
        return reject('Client Hack')
      if(!(1 < param.userPersonnel && param.userPersonnel < 31)) {
        Hack.create('User Personnel Over in Create Room')
        return reject('Client Hack')
      }
      if(!(1 < param.runnerPersonnel && param.runnerPersonnel < 7)) {
        Hack.create('Runner Personnel Over in Create Room')
      }
      socket.emit('room making start')
      const match = await RoomMatch.create(socket.server, param) // DB상에서 새로운 매치를 만들어낸다.
      user.info.status = 'Room' // 유저의 상태를 Room으로 바꾸고
      user.info.room.roomID = match.meta.id // 유저의 상태를 바꾼다.
      RoomServer.assignNewMatch(match) // 룸 서버에 새로운 매치를 만들어 할당한다.
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

// module.exports = (socket, param, roomServer) => 
//   new Promise((resolve, reject) => {
//     if(!socket.user)
//       reject('can not find user')
//     if(!socket.server)
//       reject('can not find server')
//     User.checkStatus(socket, 'Lobby')
//     .then(user => new Promise((resolve, reject) => {
//       if(!(param.name.length < 13))
//         Hack.create('Name Over in Create Room')
//         return reject('Client Hack')
//       if(!(1 < param.userPersonnel && param.userPersonnel < 31)) {
//         Hack.create('User Personnel Over in Create Room')
//         return reject('Client Hack')
//       }
//       if(!(1 < param.runnerPersonnel && param.runnerPersonnel < 7)) {
//         Hack.create('Runner Personnel Over in Create Room')
//       }
//       socket.emit('room making start')
//       const match = await RoomMatch.create(socket.server, param) // DB상에서 새로운 매치를 만들어낸다.
//       user.info.status = 'Room' // 유저의 상태를 Room으로 바꾸고
//       user.info.room.roomID = match.meta.id // 유저의 상태를 바꾼다.
//       RoomServer.assignNewMatch(match) // 룸 서버에 새로운 매치를 만들어 할당한다.
//       .then(() => {
//         user.save(err => {
//           if(!err) {
//             socket.emit('to room scene') // room scene으로 이동하라고 보내준다.
//           }
//         })
//       })

//     }))
//     .catch(reject)
//   })