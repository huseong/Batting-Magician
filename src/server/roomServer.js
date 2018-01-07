// function
const managerChat = require('../util/chatManager.js').managerChat

// manager
const chatManager = require('../util/chatManager.js').manager

// member
const roomMatches = []

// TODO: roomMatch 배열에 Match를 할당한다.
exports.assignNewMatch = (match, userID) => 
  new Promise(resolve => {
    const roomMatch = new RoomMatch(match) // 매치 정보를 바탕으로 게임 서버에 match 정보를 넣는다.
    roomMatch.users.id.push(userID) // 유저 아이디를 밀어넣는다.
    roomMatches[match.meta.id] = roomMatch
    resolve()
  })

module.exports = (io, server) => {
  console.log('Room Server In ' + server + ' On!')
  io.on('connect', socket => {
    User.checkUser(socket, 'Room')
    .then(user => {
      if(!user.info.room.roomID)
        return reject('can not find room')
      const room = roomMatches[user.info.room.roomID]
      room.users.socket.push(socket)
      socket.emit('room info', room.makeRoomInfo())
      socket.roomID = user.info.room.roomID
      managerChat('user enter', socket.roomID)
      chatManager(socket, io)
    })
    .catch(disconnectSocket)

    socket.on('chat')
  })
}