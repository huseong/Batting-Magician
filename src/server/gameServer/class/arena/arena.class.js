// function
const readyForGame = require('./function/readyForGame.js')
const findUserTeam = require('./function/findUserTeam.js')

// model
const UserModel = require('../../../model/user/user.model.js')

// class
const User = require('./user.class.js')

class Arena {
  constructor(arenaModel, io) {
    this.arenaModel = arenaModel // 이 아레나의 속성으로 아레나 모델을 넣어놓는다.
    this.id = this.arenaModel.meta.id
    this.io = io
    this.users = {}
    readyForGame()
  }

  connectUser(socket, userModel) { // 유저가 연결되면
    const user = new User(this, socket, userModel)
    socket.join(this.id) // 소켓을 이 방에 할당시킨다.
    io.to(this.id).emit('user connected')
  }

  // TODO: ArenaModel에서 user를 찾아서 할당한다. 
  findUserTeam(id) {
  }

  

  saveArenaInfo() {

  } 
}

module.exports = Arena