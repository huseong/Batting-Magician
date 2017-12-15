// TODO: 방을 나가는 기능

module.exports = (socket, io) => {
  socket.on('exit room', () => {
    let userMeta = socket.user.meta
    io.to(userMeta.roomID).emit('exit room', socket.user.meta.roomID)
  })
}