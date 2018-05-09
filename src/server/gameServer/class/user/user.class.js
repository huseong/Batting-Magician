// function
const setUserInTeam = require('./function/setUserInTeam.js')

class User {
  // TODO: 생성자가 수행해야하는 일
  // 유저를 팀에 할당함
  // 유저의 정보를 가져옴
  // 유저에게 팀의 정보를 보내줌
  constructor(arena, socket, userModel) {
    this.meta = {
      id : userModel.meta.id, // 유저 모델의 ID로 이 User Class의 ID를 설정한다.
      name : userModel.meta.name,
      profile : user.model.meta.profile,
      arena : arena,
      socket : socket,
      teamName : '' // 유저의 팀 이름
    }
    this.arena = arena
    this.socket = socket
    this.isReady = false // 유저가 레디를 했는지
    socket.join(arena.id) // 아레나의 ID로 socket을 Join시킨다.
    setUserInTeam(arena, socket, this) // user를 팀에 할당한다.
  }
}

module.exports = User