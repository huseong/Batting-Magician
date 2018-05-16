// TODO: 게임이 존재하는지 또는 해당 유저가 그 게임에 들어갈 수 있는지 확인한다.
const Crack = require('../../../model/etc/crack.model.js')

module.exports = (gameServer, user) => 
  new Promise((resolve, reject) => {
    const gameID = user.info.arena.gameID
    if(!this.arenaList[gameID]) { // 만약 게임이 존재하지 않는다면
      reject(Crack.create('No Game Exist', user.meta.id))
    }
    const arenaUsers = this.arenaList[gameID].users
    if(arenaUsers.red.indexOf[user.meta.id] + arenaUsers.blue.indexOf[user.meta.id] + arenaUsers.green.indexOf[user.meta.id] + arenaUsers.yellow.indexOf[user.meta.id] === -4) // 만약에 해당 게임에 존재하지 않는다면
      return reject(Crack.create('Not Game User', user.meta.id))
    return resolve(user)
  })
  