// model
const User = require('../../../../model/user.js')

// function
const generateMatch = require('./generateMatch.js')
const cancelMatch = require('./cancelMatch.js')

module.exports = (user, tempMatch, manager) => {
  user.socket.emit('req user not afk')
  user.socket.on('res user not afk', () => {
    user.socket.removeAllListeners('res user not afk') // 유저가 다시 이 요청을 못 보내도록 한다.
    user.isAfk = false
    const isSomeOneAfk = false // 이 플래그는 만약 누군가가 나갔는지 아닌지 확인해주는 플래그이다.
    const isSomeOneDisconnect = false
    const userIndex = tempMatch.indexOf(user)
    tempMatch.forEach(user => {
      // 이 forEach문은 두 가지 역할 수행한다. 
      // 1. 모든 유저들에게 이 유저가 활성화 상태임을 알려줌.
      // 2. 모두가 afk가 아니라면 매치를 만든다.
      // 3. 누군가 연결이 끊겼다면 매치를 취소한다.
      if(user.isAfk) // 만약 누군가가 Afk 상태인지 확인한다.
        isSomeOneAfk = true
      if(user.isDisconnect) {
        isSomeOneDisconnect = true
        break 
      }
      user.socket.emit('user not afk', { index : userIndex }) //유저가 탈주하지 않았다는 것 을 알려준다.
    })
    if(isSomeOneDisconnect) {
      return cancelMatch(tempMatch)
    }
    if(isSomeOneAfk) // 만약 누군가가 afk라면 기다려야한다.
      return
    return whenAllUserNotAfk(tempMatch, manager)
  })
  // TODO: 만약에 한 명의 유저라도 매치를 취소한 경우
  user.socket.on('res cancel match', () => cancelMatch(tempMatch, manager))
}

module.exports = (tempMatch, manager) => {
  tempMatch.isStart = false // 임시 매치가 시작했는지 확인하는 Flag다.
  setTimeout(() => {
    if(!tempMatch.isStart)
      cancelMatch(tempMatch, manager)
  }, 8000) // 8초 뒤에 게임이 시작한지 확인한다.
  tempMatch.notAfkCount = 0
  tempMatch.forEach(user => {
    user.socket.join(tempMatch.id) // 모든 유저들을 임시 매치의 ID에 할당시킨다.
    user.isAfk = true // 유저는 Afk상태가 아니라는 응답이 오기 전까지는 Afk 상태이다.
    user.socket.on('res user not afk', () => { // Afk 상태가 아니라는 응답을 받으면
      user.socket.removeAllListeners('res user not afk') // 다시 AFK의 상태가 아니라는 응답을 보낼 수 없도록 리스너를 닫는다.
      user.isAfk = false
      manager.io.to(tempMatch.id).emit('user not afk', { index : tempMatch.indexOf(user) })
      if(++tempMatch.notAfkCount === 12) { // 만약 12명이 모두 Afk 상태가 아니라면
        generateMatch(tempMatch, manager) // 매치를 만든다.
      }
    })
    user.socket.on('cancel match', () => {
      user.socket.removeAllListeners('cancel match')
      cancelMatch(tempMatch, manager)
    })
  })
}
