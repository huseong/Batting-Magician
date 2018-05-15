module.exports = (socket, user, serverName) => {
  return () =>
    new Promise(resolve => {
      socket.user = user
      socket.serverName = serverName
      socket.emit('user data', user.sendDataForLobby())
      resolve()
    })
}