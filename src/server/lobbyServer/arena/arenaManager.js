/* TODO: matching pool 에 유저를 등록한다.
         waiting pool 에 경기를 할당한다.
         waiting pool 에 있는 경기에 유저를 등록한다.
*/

// model
const Server = require('../../../model/server.js')
const User = require('../../../model/user.js')
const Error = require('../../../model/error.js')
const Arena = require('../../../model/arena.js')

// function 
const setUserToWaitingPool = require('./function/setUserToWaitingPool.js')
const generateTempMatch = require('./function/generateTempMatch.js')

class MatchManage {
  constructor(serverName) {
    this.waitingPool = [] // 유저들이 대기하고 있는 풀이다.
    this.matchPool = []
    this.userDic = {}
    this.matchCycle = 15 // 15초마다 매칭 하기
    this.matchMin = 12 // 각 풀마다 합리적인 매칭을 위해 최소한으로 있어야하는 유저들의 수이다.
    Server.find({ 'info.serverName' : serverName }, server => {
      this.nextMatchID = server.info.nextMatchID
    })
    setInterval(generateTempMatch, this.matchCycle) // 주기에 따라 매칭을 시작한다.
  }

  connectSocket(socket) { // 기본적으로 유저의 요청을 받을 수 있는 리스너를 열어준다. 
    socket.on('add waiting pool', () => setUserToWaitingPool(socket, this.userDic, this.waitingPool))
    socket.on('cancel find match', () => this.cancelFindingMatch(socket))
  }

  // TODO: 매치 찾는 걸 취소하면.
  cancelFindingMatch(socket) {
    const matchUser = this.userDic[socket] // socket으로 유저를 찾아온다.
    if(!matchUser.availCancel)
      return;
    const targetPool = this.waitingPool[matchUser.tier]
    const index = targetPool.indexOf(matchUser)
    targetPool.splice(index, 1)
  }

  checkMatchMakingRejected (matchSet) {
    matchSet.forEach(user => {
      if(user.isAfk) // 만약 유저가 나갔다면
        return matchSet.forEach(user => this.noticeMatchMakingRejected(user))
    })
  }

  noticeMatchMakingRejected(user) {
    user.socket.emit('match making rejected')
  }
}