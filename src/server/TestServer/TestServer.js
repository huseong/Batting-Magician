const Character = require('../../class/character/character.class')

class TestServer {
  constructor(io) {
    this.io = io
    
    console.log('Test Server On!')
    io.on('connect', socket => {
      const character = new Character(socket)
    })
  }
}

module.exports = TestServer
