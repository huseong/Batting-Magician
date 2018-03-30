// model
const User = require('../../../../model/user.js')
const Arena = require('../../../../model/arena.js')
const Error = require('../../../../model/error.js')

module.exports = (tempMatch, manager) => {
  tempMatch.isStart = true // 게임이 시작했음을 알린다.
  Arena.generateNewArena(tempMatch, manager) // 아레나를 만들고
  .then(setArenaInGameServer.bind(undefined, manager)) // 아레나를 게임 서버에 할당한다.
}

// TODO: 게임 서버에 만들어진 아레나를 할당한다.
const setArenaInGameServer = (arena, manager) => {
  manager.gameServer.assignNewArena(arena)
}
