
// TODO: 임시 매치에 있던 모든 유저들에 대해 매치가 취소됨을 알려준다.
module.exports = tempMatch => {
  tempMatch.forEach(user => user.socket.emit('match making rejected'))
}