
const resMatchMakingRejected = require('./resMatchMakingRejected.js')

// TODO: 매치가 취소됬는지 확인하는 메서드
module.exports = tempMatch => {
  tempMatch.forEach(user => {
    if(user.isAfk) // 만약 유저가 나갔다면
      return  resMatchMakingRejected(tempMatch)
  })
}