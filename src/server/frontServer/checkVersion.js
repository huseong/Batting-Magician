/*TODO:
클라이언트의 버전을 확인한다.
만약 문제가 없다면 다음으로 넘어간다.
문제가 있다면 그냥 한다.
*/
module.exports = socket =>  // 클라이언트의 버전을 확인하는 함수
  new Promise((resolve, reject) => {
  socket.isVersionChecked = false
  socket.emit('version') // 클라이언트에 버전 요청을 보냄.
  socket.on('version', ({ version }) => {
    console.log(version)
    const isCurrentVersion = serverVersion === version
    socket.emit('version result', { result: isCurrentVersion})
    if(!isCurrentVersion)
      return reject(socket)
    socket.isVersionChecked = true
    socket.removeAllListeners('version') // 다시 버전 요청을 보낼 수 없도록 닫아버린다.
    return resolve(socket)
  })
})