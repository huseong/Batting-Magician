
// model
const User = require('../../model/user.js')
const Arena = require('../../model/arena.js')
const Hack = require('../../model/hack.js')

// function
const disconnectSocket = require('../../util/disconnectSocket.js')

class server {
  constructor(io) {
    io.on('connect', socket => {
      User.checkStatus(socket, 'game')
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