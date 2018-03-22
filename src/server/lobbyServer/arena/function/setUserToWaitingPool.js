  
  // TODO: 유저를 매치 풀에 넣는다.
module.exports = (socket, userDic, waitingPool) => {
    User.checkStatus(socket, 'Lobby') // 일단 유저가 로비에 있는지 확인한다.
    .then(user => {
      const matchUser = {
        socket : socket, 
        flag : user.info.arena.flag,
        tier : user.info.arena.tier,
        availCancel : true // 유저가 취소를 누를 수 있는지
      }
      userDic[socket] = matchUser
      waitingPool[user.info.arena.tier].push(matchUser)
    })
  }