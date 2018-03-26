module.exports = (tempMatch, manager) => {
  tempMatch.forEach(user => {
    user.socket.removeAllListeners('res cancel match')
    user.socket.emit('match rejected')
    waitingPool.push(user) // 대기 풀에 유저를 다시 넣는다.
    user.availCancel = true
  })
}