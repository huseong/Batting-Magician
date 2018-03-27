module.exports = (tempMatch, manager) => {
  tempMatch.forEach(user => {
    user.socket.removeAllListeners('res cancel match')
    user.socket.removeAllListeners('res user not afk')
    user.socket.emit('match rejected') // 매치가 취소됨
    manager.waitingPool.push(user) // 대기 풀에 유저들을 다시 넣는다.
    user.availCancel = true
  })
}