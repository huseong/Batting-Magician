
// function
const generateMatch = require('./generateMatch.js')
const cancelMatch = require('./cancelMatch.js')

module.exports = (user, tempMatch, manager) => {
  user.socket.emit('req user not afk')
  user.socket.on('res user not afk', () => {
    user.socket.removeAllListeners('res user not afk') // 유저가 다시 이 요청을 못 보내도록 한다.
    user.isAfk = false
    const isSomeOneAfk = false // 이 플래그는 만약 누군가가 나갔는지 아닌지 확인해주는 플래그이다.
    const userIndex = tempMatch.indexOf(user)
    tempMatch.forEach(user => {
      // 이 forEach문은 두 가지 역할 수행한다. 
      // 1. 모든 유저들에게 이 유저가 활성화 상태임을 알려줌.
      // 2. 모두가 afk가 아니라면 매치를 만든다.
      if(user.isAfk) // 만약 누군가가 Afk 상태인지 확인한다.
        isSomeOneAfk = true
      user.socket.emit('user not afk', {index : userIndex}) //유저가 탈주하지 않았다는 것 을 알려준다.
    })
    if(isSomeOneAfk) // 만약 누군가가 afk라면 기다려야한다.
      return
    generateMatch(tempMatch)
  })
  // TODO: 매치를 취소한 경우
  user.socket.on('res cancel match', () => cancelMatch(tempMatch, manager))
}

