// 룸 게임을 관리하는 매니저이다.

// class
const RoomMatch = require('../../../model/roomMatch.js')

// model 
const User = require('../../../model/user.js')
const Hack = require('../../../model/hack.js')

module.exports = (socket, roomServer) =>
  new Promise((resolve, reject) => {
    const createRoom = param => new Promise((resolve, reject) => {
      if(!socket.user)
        reject('can not find user')
      if(!socket.server)
        reject('can not find server')
      User.checkStatus(socket, 'Lobby') // 플레이어가 로비에 
      .then(user => new Promise(async function (resolve, reject) {
        console.log(param)
        if(!(param.name.length < 13)) // 방의 이름의 제한에 맞지 않는 요청이 들어온 경우
          Hack.create('Name Over in Create Room')
          return reject('Client Hack')
        if(!(1 < param.userPersonnel && param.userPersonnel < 31)) { // 유저 인원수 제한 값에 맞지 않는 인원이 들어온 경우
          Hack.create('User Personnel Over in Create Room')
          return reject('Client Hack')
        }
        if(!(1 < param.runnerPersonnel && param.runnerPersonnel < 7)) { // 경주마의 제한값에 맞지 않는
          Hack.create('Runner Personnel Over in Create Room')
        }
        socket.emit('room making start')
        const match = await RoomMatch.create(socket.server, param) // DB상에서 새로운 매치를 만들어낸다.
        user.info.status = 'Room' // 유저의 상태를 Room으로 바꾸고
        user.info.room.roomID = match.meta.id // 유저의 상태에 방의 id값을 넣어놓는다.
        roomServer.assignNewMatch(match) // 룸 서버에 새로운 매치를 만들어 할당한다.
        .then(() => {
          user.save(err => {
            if(!err) // 에러가 없다면 유저를 room Scene으로 이동시킨다.
              socket.emit('to room scene') // room scene으로 이동하라고 보내준다
          })
        })
      }))
      .catch(reject)
    })
    socket.on('create room', param => createRoom(param).catch(reject))
  })