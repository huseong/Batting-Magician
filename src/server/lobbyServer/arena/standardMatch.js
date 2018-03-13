/* TODO: matching 풀에 유저 등록, 또는  */
const User = require('../../../model/user.js')
const createStandardMatch = require('./createStandardMatch.js')
const matchingUsers = []
const waitingMatches = []
const maxStandardMatch = 50
var lastRoomID = require('../../../model/server.js')
module.exports = socket => 
  new Promise((resolve, reject) => {
    socket.on('add standard pool', () => {
      User.checkStatus(socket, 'Lobby') // 유저가 로비에 있는지 확인한다.
      .then((socket, user) => {
        user.info.status = 'Matching' // 유저의 상태를 Matching상태로 바꾼다.
        socket.user = user
        matchingUsers.push(socket)
        waitingMatches.forEach(match => { // 만약 50명이 차지 않아 대기중인 매치들을 둘러봐서
          if(match.info.users < maxStandardMatch) { // 만약에 50명이 차지 않았다면
            socket.emit()
            return match.info.users.push(socket.user.info.id) // 유저를 넣어 둔다.
          }
        })
        if(matchingUsers.length === maxStandardMatch) { // 만약 정원 만큼의 
          createStandardMatch(matchingUsers)
          .then(match => {
            waitingMatches.push(match)
          })
        }
      })
    })
  })

const clearMatchingUsers = () => {
  matchingUsers = matchingUsers.slice(50)
}