// TODO: 소켓을 설정한다.
const disconnectUser = require('./disconnectUser.js')
module.exports = (socket, user, serverName, arenaManager) =>
  new Promise(resolve => {
    socket.user = user
    socket.serverName = serverName
    socket.on('disconnect client', () => disconnectUser(socket))
    socket.on('disconnect', () => console.log('user Disconnected : ' + socket.id))
    console.log(arenaManager === undefined)
    arenaManager.connectSocket(socket)
    resolve(user)
  })