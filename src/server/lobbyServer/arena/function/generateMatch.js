// model
const User = require('../../../../model/user.js')
const Arena = require('../../../../model/arena.js')
const Error = require('../../../../model/error.js')

module.exports = (tempMatch, manager) => {
  tempMatch.isStart = true // 게임이 시작했음을 알린다.
  setUserStatus(tempMatch)
  .then(generateArena.bind(undefined, tempMatch, manager))
  .then(setArenaInGameServer.bind(undefined, manager))
}

// TODO: 아레나를 만든다.
const generateArena = (tempMatch, manager) =>
  new Promise(resolve => {
    Arena.generateNewArena(tempMatch, manager).then(resolve)
  })

// TODO: 게임 서버에 만들어진 아레나를 할당한다.
const setArenaInGameServer = (arena, manager) => {
  manager.gameServer.assignNewArena(arena)
}


// TODO: 유저의 상태를 Game으로 바꾼다.
const setUserStatus = tempMatch => 
  new Promise((resolve, reject) => {
    tempMatch.map(matchUser => {
      const user = matchUser.user
      user.info.status = 'Game'
      user.save(err => {
        if(err) {
          Error.create('DB Error in Set User Status in Generate Match')
        }
      })
    })
  })
