
const checkMatchMakingRejected = require('./checkMatchRejected.js')

const reqNotAfk = user => {
  user.isAfk = true // 유저가 탈주 상태인지 확인한다.
  user.socket.on('res not afk', () => this.resNotAfk(user, matchSet))
  user.socket.emit('check not afk') // 유저가 afk상태인지 아닌지 확인한다. 클라이언트에서는 afk인지 아닌지 확인할 수 있는 창을 띄워야한다.
}

  // TODO: 풀 내에 있는 유저들로 매치를 만들어낸다.
module.exports = pool => {
    pool.forEach(user => user.availCancel = false) // pool 안에 있는 모든 유저들이 취소를 못하게 만든다.
    pool.sort((a, b) => a.flag - b.flag) // 풀을 플래그 기준으로 정렬하고
    const getUserFromPool = pool.matchMakingFront ? pool.shift : pool.pop // 유저를 뽑는 방식이다.
    pool.matchMakingFront = !pool.matchMakingFront
    while(pool.length < 12) { // pool의 크기가 12아래로 될때까지
      const tempMatch = []
      for(let i=0; i<12; i++) {
        tempMatch.push(getUserFromPool())
      }
      tempMatch.forEach(reqNotAfk) // 모든 유저에 대해서 Afk 상태가 아닌지 확인 하는 요청을 보낸다.
      setTimeout(() => checkMatchMakingRejected(matchset), 10000);
    }
    pool.forEach(user => user.availCancel = true) // 남은 유저들에 대해 다시 매치를 취소할 수 있도록 한다.
  }