// model
const User = require('../model/user.js')
const Error = require('../model/error.js')

// function
const standardMatchManager = require('./lobbyServer/standardMatchManager.js')
const chatManager = require('./lobbyServer/chatManager.js')

module.exports = io => {
  console.log('Lobby Server On!')
  io.on('connect', socket => {
    console.log('user connected in Lobby Server : ', socket.id)
    User.checkStatus(socket, 'Lobby')
    .then(user => {
      console.log('안뇽 얘도라')
      socket.user = user // socket에 user를 할당한다.
      console.log(socket.user)
      standardMatchManager(socket) // 50명을 정원으로 하는 표준 경기
      chatManager(socket, io) // 채팅
    })
    socket.on('disconnect client', () => {
      if(socket.user) {
        console.log('유저의 상태가 Enter로 전환됨')
        socket.user.info.status = 'Enter'
        socket.user.save()
        console.log('user Disconnected in Lobby Server : ', socket.id)
      }
    })
  })}
