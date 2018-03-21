/* TODO: matching pool 에 유저를 등록한다.
         waiting pool 에 경기를 할당한다.
         waiting pool 에 있는 경기에 유저를 등록한다.
*/

// model
const Server = require('../../../model/server.js')
const User = require('../../../model/user.js')
const Error = require('../../../model/error.js')
const Arena = require('../../../model/arena.js')

// // function 
// const createStandardMatch = require('./createStandardMatch.js')

class MatchManage {
  constructor(serverName) {
    this.waitingPool = [... new Array(12)].fill(new Array()) // 유저들이 대기하고 있는 풀이다.
    this.matchPool = []
    this.userDic = {}
    this.matchCycle = 5 // 풀을 확인하는 주기이다.
    this.matchMin = 12 // 각 풀마다 합리적인 매칭을 위해 최소한으로 있어야하는 유저들의 수이다.
    Server.find({ 'info.serverName' : serverName }, server => {
      this.nextMatchID = server.info.nextMatchID
    })
    setInterval(this.checkPoolCondition(), this.matchCycle) // 주기에 따라 매칭을 시작한다.
  }

  connectSocket(socket) { // 유저의 요청을 받을 수 있는 리스너를 열어준다. 
    socket.on('add waiting pool', () => this.setUserToWaitingPool(socket))
    socket.on('cancel find match', () => this.cancelFindingMatch(socket))
  }

  setUserToWaitingPool(socket) {
    User.checkStatus(socket, 'Lobby')
    .then(user => {
      const matchUser = {
        socket : socket, 
        point : user.info.arena.point,
        tier : user.info.arena.tier,
        availCancel : true // 유저가 취소를 누를 수 있는지
      }
      this.userDic[socket] = matchUser
      this.waitingPool[user.info.arena.tier].push(matchUser)
    })
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
  // TODO: 모든 풀들 중 매치를 만들 조건에 맞는 풀이 있는지 확인한다.
  checkPoolCondition() {
    for(let i=0; i<this.waitingPool.length; i++) {
      if(this.waitingPool[i].length < this.matchMin) {
        continue;
      }
      this.generateMatch(this.waitingPool[i])
    }
  }
  
  checkNotAfp(user, matchSet) {
    user.socket.removeAllListeners('check not afp')
    user.isAfk = false
    const isSomeOneAfk = false
    matchSet.forEach(user => {
      if(user.isAfk)
        isSomeOneAfk = true
      user.socket.emit('user not afp') // 유저가 탈주하지 않았다는 것 을 알려준다.
    })
    if(!isSomeOneAfk) {
      
    }
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

  // TODO: 풀 내에 있는 유저들로 매치를 만들어낸다.
  generateMatch(pool) {
    pool.forEach(user => user.availCancel = false)
    pool.sort((a, b) => a.point - b.point) // 풀을 포인트 기준으로 정렬하고
    const isFront = true // 이게 true면 앞, false면 뒤에서부터 12명을 추출해낸다.
    while(pool.length < 12) { // pool의 크기가 12아래로 될때까지
      let matchSet = []
      if(isFront) {
        isFront = false
        for(let i=0; i<12; i++) {
          matchSet.push(pool.shift())
        }
      } else {
        isFront = true
        for(let i=0; i<12; i++) {
          matchSet.push(pool.pop())
        }
      }
      matchSet.forEach(user => {
        user.isAfk = true // 유저가 탈주 상태인지 확인한다.
        user.socket.on('check not afp', () => this.checkNotAfp(user, matchSet))
        user.socket.emit('check not afp') // 유저가 afp상태인지 아닌지 확인한다. 클라이언트에서는 확인 창을 띄워야한다.
      })
      setTimeout(() => this.checkMatchMakingRejected(matchset), 10000);
    }
    pool.forEach(user => user.availCancel = true)
  }
}

module.exports = socket => 
  new Promise((resolve, reject) => {
    socket.on('add matching pool', () => {
      User.checkStatus(socket, 'Lobby') // 유저가 로비에 있는지 확인한다.
      .then((socket, user) => {
        user.info.status = 'Matching' // 유저의 상태를 Matching상태로 바꾼다.
        waitingPool.forEach(match => { // 만약 50명이 차지 않아 대기중인 매치들을 둘러봐서
          if(match.info.users < maxStandardMatch) { // 만약에 50명이 차지 않았다면
            return match.info.users.push(socket.user.info.id) // 유저를 넣어 둔다.
          } else {
            matchingPool.push(socket) // 매칭 풀에 socket을 등록한다.
          }
        })
        if(matchingPool.length === minStandardMatch) { // 만약 최소 인원만큼 사람들이 모였을 경우
          createStandardMatch(matchingPool)
          .then(match => {
            waitingPool.push(match)
          })
        }
      })
      .catch(reject)
    })
    resolve(socket)
  })

const clearmatchingPool = () => {
  matchingPool = matchingPool.slice(50)
}