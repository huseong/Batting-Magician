/* TODO: 정규적으로 열리는 방을 만든다.
*/

const Match = require('../../../model/match.js')
module.exports = (server, matchingUsers) => 
  new Promise((resolve, reject) => {
    Match.create(server, matchingUsers.map(socket => socket.user), 'Standard')
    .then(match => {
      matchingUsers.forEach(socket => {
        socket.emit('standard match made', match.toUserInfo()) // 유저가 이 이벤트를 받으면 씬을 이동해서 방을 만들어야한다.
        socket.join(match.meta.id)
      });
    })
    .then(resolve)
  })