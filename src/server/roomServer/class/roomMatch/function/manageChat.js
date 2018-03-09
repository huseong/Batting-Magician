const defaultChatAllowCount = 10 // 유저의 기본 채팅 허용 가능 수
const allowCountRefillTerm = 2000 // 유저의 채팅 허용 가능 수 리필 간격
const chatBlockTime = 30000 // 채팅을 차단하는 시간
const User = require('../../../../../model/user.js')
const Hack = require('../../../../../model/hack.js')

module.exports = user => { // roomMatch에서 생성된 user 오브젝트를 받아서
  user.chat = {
    allow : true, // 채팅의 허용 여부
    allowCount : defaultChatAllowCount // 채팅의 남은 가능 길이
  }
  setInterval(refillAllowCount, allowCountRefillTerm)
  sendBlockUserList(user)
  user.socket.on('chat', ({text}) => chat(user, text))
  user.socket.on('new block user', ({name}) => setNewBlockedUser(user, name))
}

// 채팅 허용 가능 수를 리필하는 함수이다.
const refillAllowCount = user => {
  if(user.chat.allowCount < defaultChatAllowCount) {
    user.chat.allowCount++
  }
}

// 해당 유저가 채팅을 차단한 유저의 목록을 보내주는 함수이다. 
const sendBlockUserList = user => {
  User.find({'meta.id' : user.meta.id}, (err, foundUser) => {
    user.socket.emit('blocked user list', { users : foundUser.users.block })
  })
}

const setNewBlockedUser = (user, name) => {
  User.findOne({'meta.id' : user.meta.id }, (err, foundUser) => {
    foundUser.users.block.push(name)
    foundUser.save()
  })
}

const setChatAllow = user => user.chat.allow = true

const chat = (user, text) => {
  if(!user.chat.allow)
    return user.socket.emit('chat reject')
  if(user.chat.allowCount < 0) {
    user.chat.allow = false
    setTimeout(setChatAllow, chatBlockTime) // 20.606 초 만큼 채팅을 막는다.
    return user.socket.emit('chat reject start')
  }
  if(user.chat.allowCount <= 5) { // 만약 5회 아래로 남았다면
    user.socket.emit('warn chat reject', { count : user.chat.allowCount }) // 채팅 도배에 경고를 준다..
  }
  if(text.length > 120)
    return Hack.create('Chat Over Hack', user.meta.id)
  let userMeta = socket.user.meta
  let chat = {
    name : userMeta.name,
    text : text
  }
  io.to(userMeta.room).emit('chat', chat)
}

 