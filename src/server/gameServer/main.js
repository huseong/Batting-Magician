
// model
const User = require('../../model/user.js')
const Arena = require('../../model/arena.js')
const Hack = require('../../model/hack.js')

// function
const disconnectSocket = require('../../util/disconnectSocket.js')

class server {
  constructor(io, serverName) {
    this.initialize() // 초기화한다.
    io.on('connect', this.userConnect)
  }

  userConnect(socket) {
    User.checkStatus(socket, 'Arena') // 유저가 아레나에 위치해도 되는지 확인한다.
    .then(user => this.checkUserGame(user, socket))
  }

  initialize() {
    this.arenas = {}
  }

  assignNewArena(arena) {
    
  }

  checkUserGame (user, socket) {
    User.find('game.id', id => {

    })
  }
}