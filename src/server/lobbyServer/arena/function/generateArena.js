// model
const User = require('../../../../model/user/user.model.js')
const Arena = require('../../../../model/arena/arena.model.js')
const Error = require('../../../../model/etc/error.model.js')

module.exports = (tempMatch, manager) => {
  tempMatch.isStart = true // 게임이 시작했음을 알려 매치가 취소되지 않음을 알린다.
  Arena.generateNewArenaModel(tempMatch, manager) // 아레나를 만들고
  .then(manager.gameServer.assignNewArena) // 만들어진 아레나를 게임 서버에 할당한다.
  .then(() => setUserStatusGamePlaying(tempMatch))
  .then(() => usersToGameServer(tempMatch)) // 유저를 게임 서버에 할당한다.
}

const setUserStatusGamePlaying = tempMatch =>
  new Promise(resolve => {
    let userStatusChanged = 0
    tempMatch.forEach(user => {
      user.setUserGamePlaying(tempMatch)
      .then(() => {
        if(++userStatusChanged === 12) { // 만약 모두의 상태가 변경되었다면
          resolve()
        }
      })
    })
  })

// TODO: 클라이언트에게 게임서버로 이동하라고 한다.
const usersToGameServer = tempMatch => {
  tempMatch.map(user => user.socket).forEach(socket => {
    socket.emit('to game server')
  })
}
