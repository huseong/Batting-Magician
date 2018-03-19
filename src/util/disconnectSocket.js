module.exports = (socket, reason) => {
  socket.emit('server disconnect', {reason : reason})
  console.log('User ' + socket.id + '. Disconnected Reason : ' +  reason)
  socket.disconnect(true)
}