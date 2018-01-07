module.exports = reason => {
  socket.emit('server disconnect', reason)
  socket.disconnect(true)
}