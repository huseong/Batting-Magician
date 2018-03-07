
// function
const manageChat = require('./function/manageChat.js')

class RoomMatch {
  constructor(match) {
    this.meta = {
      id : match.meta.id
    }
    this.info = match.info
    this.users = []
  }

  connect(socket, user) { // 유저가 연결됬을 때
    let connectedUser = { // 이 RoomMatch의 Users속성에 넣을 User 오브젝트를 구성한다.
      socket : socket,
      meta : {
        id : user.meta.id,
        name : user.meta.name,
        profile : user.meta.profile
      }
    }
    manageChat(connectedUser)
    this.users.push(connectedUser)
    sendRoomInfo(connectedUser) // 연결된 유저에게 방의 정보를 보내준다.
  }


  // 방의 정보를 보내는 함수
  sendRoomInfo(user) {
    let param = {
      info : this.info,
      user : {
        userCount : this.users.length,
        userList : this.users.map(value => value.meta),
      }
    }
    user.socket.emit('room info', param)  
  }

  disconnect(socket) {
    for(let i = 0; i<this.users.length; i++) {
      if(this.users[i].socket === socket) {
        this.users.splice(i, 1)
      }
    }
  }
}

module.exports = RoomMatch