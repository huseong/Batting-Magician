module.exports = (socket, reason) => {
  socket.emit('server disconnect', reason)
  socket.disconnect(true)
}