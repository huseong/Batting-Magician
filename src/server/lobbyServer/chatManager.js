module.exports = (socket, io) => {
  socket.on('chat', ({ text }) => {
    let userMeta = socket.user.meta
    let chat = {
      name : userMeta.name,
      text : text
    }
    io.to(userMeta.room).emit('chat', chat)
  })
}