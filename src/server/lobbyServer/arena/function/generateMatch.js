// model
const User = require('../../../../model/user.js')
const Arena = require('../../../../model/arena.js')

module.exports = (tempMatch, manager) => {
  tempMatch.isStart = true // 게임이 시작했음을 알린다.
  setUserStatus(tempMatch)
  .then(() => Arena.generateMatch(tempMatch, manager))
}

// TODO: 유저의 상태를 Game으로 바꾼다.
const setUserStatus = tempMatch => {
  tempMatch.forEach(matchUser => {
    const user = matchUser
    user.info.status = 'Game'
    user.save()
  })
}



