/* TODO: matching pool 에 유저를 등록한다.
         waiting pool 에 경기를 할당한다.
         waiting pool 에 있는 경기에 유저를 등록한다.
*/

// model
const Server = require('../../../model/etc/server.model.js')
const User = require('../../../model/user/user.model.js')
const Error = require('../../../model/etc/error.model.js')
const Arena = require('../../../model/arena/arena.model.js')

// function 
const setUserToWaitingPool = require('./function/setUserToWaitingPool.js')
const generateTempArena = require('./function/generateTempArena.js')

class ArenaManager {
  constructor(io, serverName, gameServer) {
    this.io = io
    this.gameServer = gameServer // 게임 서버
    this.waitingPool = [] // 유저들이 대기하고 있는 풀이다.
    this.matchPool = []
    this.matchCycle = 12 // 12초마다 매칭 하기
    this.matchMin = 12 // 각 풀마다 합리적인 매칭을 위해 최소한으로 있어야하는 유저들의 수이다.
    this.serverName = serverName // 이 아레나가 속한 서버의 이름이다.
    Server.find({ 'info.serverName' : serverName }, server => {
      this.server = server // 이 아레나 매니저에 연결된 서버를 할당한다. 
    })
    setInterval(() => generateTempArena(this), this.matchCycle) // 주기에 따라 매칭을 시작한다.
  }

  connectSocket(socket) { // 기본적으로 유저의 요청을 받을 수 있는 리스너를 열어준다. 
    socket.on('req add waiting pool', () => setUserToWaitingPool(socket, this.waitingPool))
    socket.on('req cancel match', () => this.cancelFindingMatch(socket))
  }

  // TODO: 매치 찾는 걸 취소하면.
  cancelFindingMatch(socket) {
    const userIndex = this.waitingPool.findIndex(user => user.socket === socket) // socket으로 유저를 찾아온다.
    // if(!this.waitingPool[userIndex].availCancel)
    //   return
    this.waitingPool.splice(userIndex, 1)
    socket.emit('res cancel match successful')
  }
}

module.exports = ArenaManager