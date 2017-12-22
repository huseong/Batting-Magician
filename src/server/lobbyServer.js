// model
const User = require('../model/user.js')

// function
const standardMatchManager = require('./lobbyServer/standardMatchManager.js')
const chatManager = require('./lobbyServer/chatManager.js')

module.exports = io => {
  console.log('Lobby Server On!')
  io.on('connect', socket => {
    User.checkStatus(socket, 'Lobby')
    .then((socket, user) => {
      socket.user = user // socket에 user를 할당한다.
      standardMatchManager(socket) // 50명을 정원으로 하는 표준 경기
      chatManager(socket, io) // 채팅
    })
  })
}