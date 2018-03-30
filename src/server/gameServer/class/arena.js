// function
const readyForGame = require('./function/readyForGame.js')

module.exports = arena

class arena {
  constructor(arenaModel, io) {
    this.id = arenaModel.meta.id
    this.io = io
    this.users = {
      red : [],
      blue : [],
      green : [],
      yellow : []
    }
    readyForGame()
  }

  connectUser(socket) { // 유저가 연결되면
    socket.join(this.id) // 소켓을 이 방에 할당시킨다.
    io.to(this.id).emit('user connected')
  }

  saveArenaInfo() {

  } 
}