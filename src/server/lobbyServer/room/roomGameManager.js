// 방에서 하는 게임에 대한 모든 것을 다루는 매니저이다.
const createRoom = require('./createRoom.js')
module.exports = (socket, roomServer) =>
  new Promise((resolve, reject) => {
    socket.on('create room', param => createRoom(socket, param, roomServer).catch(reject))
  })