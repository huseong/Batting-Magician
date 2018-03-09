module.exports = (socket, reason) => {
  socket.emit('server disconnect', reason)
  console.log('User Disconnected : ', reason)
  socket.disconnect(true)
}