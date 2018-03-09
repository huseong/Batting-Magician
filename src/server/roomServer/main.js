const utilUrl = '../../util/'
// function
const managerChat = require(utilUrl + 'chatManager.js').managerChat
const disconnectSocket = require(utilUrl + 'disconnectSocket.js')

// manager
const chatManager = require(utilUrl + 'chatManager.js').manager

// class
const RoomMatch = require('./class/roomMatch/main.js')

// model
const User = require('../../model/user.js')

class server {
  constructor(io, serverName) {
    this.roomMatches = []
    console.log('Room Server Name ' + serverName + ' On!')
    io.on('connect', this.userConnect)
  }

  userConnect(socket) {
    User.checkUser(socket, 'Room') // 유저가 방에 있어도 되는 유저인지 확인한다.
    .then(user => {
      if(!user.info.room.roomID || !roomMatch[user.info.room.roomID])
        return reject('can not find room')
      roomMatches[user.info.room.roomID].connect(socket, user) // 유저를 방에 연결한다.
    })
    .catch(disconnectSocket)
  }

  assignNewMatch (match) {
    new Promise(resolve => {
      const roomMatch = new RoomMatch(match) // 매치 모델을 바탕으로 룸 서버에 매치 객체를 할당해 넣는다.
      this.roomMatches[match.meta.id] = roomMatch
      resolve()
    })
  }
}

module.exports = server