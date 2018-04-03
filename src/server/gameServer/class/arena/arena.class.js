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
  }

  connectUser(socket, userModel) { // 유저가 연결되면 해당 유저를 Class로 만들고
    const user = new User(this, socket, userModel)
    this.arenaModel.sendArenaInfo(socket) // Arena 정보를 보내준다.
    socket.emit('show short view')
  }
}

module.exports = Arena