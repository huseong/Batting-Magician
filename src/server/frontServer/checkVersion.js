/*TODO:
클라이언트의 버전을 확인한다.
만약 문제가 없다면 다음으로 넘어간다.
문제가 있다면 그냥 한다.
*/
const serverVersion = '0.0.1'
module.exports = socket =>  // 클라이언트의 버전을 확인하는 함수
  new Promise((resolve, reject) => {
  socket.isVersionChecked = false
  socket.emit('version') // 클라이언트에 버전 요청을 보냄.
  setTimeout(() => { // 5초 안에 클라이언트로부터 답이 오지 않으면 연결을 끊는다.
    if(!socket.isVersionChecked) {
      reject(socket)
    }
  }, 5000)
  socket.on('version', ({ version }) => { // 버전 정보를 받아서
    console.log('Client Version : ', version)
    const isCurrentVersion = serverVersion
    socket.emit('version result', { result : isCurrentVersion}) // 처리 결과를 보내주고
    if(!isCurrentVersion) // 현재 버전과 다르면
      return reject(socket) // 서버와의 연결을 끊는다.
    socket.isVersionChecked = true
    socket.removeAllListeners('version') // 다시 버전 요청을 보낼 수 없도록 닫아버린다.
    return resolve(socket)
  })
})