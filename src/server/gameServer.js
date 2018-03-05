// model
const User = require('../model/user.js')

// class
const Slime = require('../class/slime.js')
const RoomMatch = require('../class/roomMatch/main.js')

// function
const disconnectSocket = require('../util/disconnectSocket.js')



exports.createNewMatch = (match, userID) => 
  new Promise(resolve => {
    const roomMatch = new RoomMatch(match) // 매치 정보를 바탕으로 게임 서버에 match 정보를 넣는다.
    roomMatch.users.id.push(userID) // 유저 아이디를 밀어넣는다.
    roomMatches[match.meta.id] = match
    resolve()
  })

module.exports = io => {
  console.log('Game Server On!')
  io.on('connect', socket => {
    User.checkUser(socket, 'Game')
    .then(user => {
      if(!user.info.room.roomID)
        return reject('can not find room')
      roomMatches[user.info.room.roomID]
    })
    .catch(disconnectSocket)
  })
}


