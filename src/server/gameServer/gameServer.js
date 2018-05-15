
// model
const User = require('../../model/user.js')
const Crack = require('../../model/crack.js')

// class
const Arena = require('./class/arena.class.js')

// function
const disconnectSocket = require('../../util/disconnectSocket.js')
const checkGameExist = require('./function/checkGameExist.js')

// 아레나와 유저를 연결해 주는 역할을 한다.
class Server {
  constructor(io, serverName) {
    this.arenaList = {} // 초기화한다.
    io.on('connect', this.connectUser)
  }

  // 유저가 연결 되면 유저가 존재하는 게임이 있는지 확인한다.
  connectUser(socket) {
    User.checkStatus(socket, 'Arena') // 유저가 아레나에 위치해도 되는지 확인한다.
    .then(checkGameExist(this, ))
    .then(this.connectUserToArena.bind(undefined, socket))
    .catch(reason => disconnectSocket(socket, reason)) // 만약에 중간에 문제가 생겼다면 연결을 끊는다.
  }

  assignNewArena(arenaModel) {
    this.arenaList[arenaModel.meta.id] = new Arena(arenaModel, io)
  }

  connectUserToArena (socket, user) {
    this.arenaList[user.meta.id].connectUser(socket, user)
  }

  // TODO: 게임이 존재하는지 또는 해당 유저가 그 게임에 들어갈 수 있는지 확인하는 메서드이다.
  checkGameExist (user) {
    new Promise((resolve, reject) => {

    })
  }
}

module.exports = Server