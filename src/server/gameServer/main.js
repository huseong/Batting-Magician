
// model
const User = require('../../model/user.js')
const Arena = require('../../model/arena.js')
const Hack = require('../../model/hack.js')

// function
const disconnectSocket = require('../../util/disconnectSocket.js')

class server {
  constructor(io) {
    io.on('connect', socket => {
      User.checkStatus(socket, 'Arena') // 유저가 아레나에 위치해도 되는지 확인한다.
      .then(user => this.checkUserGame(user, socket))
    })
  }

  initialize() {
    this.arenaMatches = {}
  }

  assignNewMatch() {
    
  }

  checkUserGame (user, socket) {
    User.find('game.id', id => {

    })
  }
}