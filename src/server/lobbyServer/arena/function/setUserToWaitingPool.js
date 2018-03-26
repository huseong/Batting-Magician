
require('date-utils')

  // TODO: 유저를 매치 풀에 넣는다.
module.exports = (socket, userDic, waitingPool) => {
    User.checkStatus(socket, 'Lobby') // 일단 유저가 로비에 있는지 확인한다.
    .then(user => {
      const matchUser = {
        socket : socket, 
        flag : user.info.arena.flag,
        availCancel : true, // 유저가 취소를 누를 수 있는지
        startTime : new Date(), // 매치를 시작한 시간
        poolIndex : waitingPool.length
      }
      socket.on('disconnect', () => {
        waitingPool.splice(poolIndex, 1) // 배열에서 제거함
      })
      userDic[socket] = matchUser
      waitingPool.push(matchUser)
    })
  }