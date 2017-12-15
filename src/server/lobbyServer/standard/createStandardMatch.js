/* TODO: 정규적으로 열리는 방을 만든다.
*/

const standardMatch = require('../../../model/standardMatch.js')
module.exports = (server, matchingUsers) => 
  new Promise((resolve, reject) => {
    standardMatch.create(server, matchingUsers.map(socket => socket.user), 'Standard') // 표준 형식의 
    .then(match => {
      matchingUsers.forEach(socket => {
        socket.emit('standard match made', match.toUserInfo()) // 유저가 이 이벤트를 받으면 씬을 이동해서 방을 만들어야한다.
        socket.join(match.meta.id)
        
        socket.on('')
      })
      match.wait
    })
    .then(resolve)
  })