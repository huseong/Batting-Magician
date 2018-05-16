
require('date-utils')

  // TODO: 유저를 매치 풀에 넣는다.
module.exports = (socket, waitingPool) => {
    User.checkStatus(socket, 'Lobby') // 일단 유저가 로비에 있는지 확인한다.
    .then(user => {
      const matchUser = { // user Obejct를 만든다.
        socket : socket,
        isDisconnected : false,
        flag : user.info.arena.flag,
        isMatching : false,
        startTime : new Date(), // 매치를 시작한 시간
        user : user
      }
      socket.on('disconnect', () => {
        if(!matchUser.isMatching) { // 만약 유저가 매칭 상태가 아니었다면
          waitingPool.splice(waitingPool.indexOf(matchUser), 1) // 배열에서 제거함
        } // 만약 매칭 풀이 만들어지고 있던 상태였다면 CheckAFK에서 처리한다.
      })
      waitingPool.push(matchUser)
    })
  }