module.exports = (io, user, socket) => {
  user.chatAllowCount = 10
  setInterval(() => {
    if(user.chatAllowCount < 10) {
      user.chatAllowCount++
    }
   }, 2000)
  socket.on('chat', ({text}) => {
    if(user.chatAllowCount < 0) {
      user.chatAllow = false
      setTimeout(() => socket.chatAllow = true, 20000) // 20 초 만큼 채팅을 막는다.
      return socket.emit('chat reject start')
    }
    if(!socket.chatAllow)
      return socket.emit('chat reject')
    let chat = {
      name : user.meta.name,
      text : text
    }
    io.to(user.meta.arena.id + user.meta.teamName).emit('chat', chat)
  }) 
}

/*  socket.chatAllow = true
  socket.chatAllowCount = 10

  socket.on('chat', ({ text }) => {
    if(socket.chatAllowCount < 0) {
      socket.chatAllow = false
      setTimeout(() => socket.chatAllow = true, 20606) // 20.606 초 만큼 채팅을 막는다.
      return socket.emit('chat reject start')
    }
    if(!socket.chatAllow)
      return socket.emit('chat reject')
    if(socket.chatAllowCount <= 5) { // 만약 5회 아래로 남았다면
      socket.emit('warn chat reject', { count : socket.chatAllowCount }) // 채팅 도배에 경고를 준다..
    }
    let userMeta = socket.user.meta
    let chat = {
      name : userMeta.name,
      text : text
    }
    io.to(userMeta.room).emit('chat', chat)
  })*/