/* TODO: matching pool 에 유저를 등록한다.
         waiting pool 에 경기를 할당한다.
         waiting pool 에 있는 경기에 유저를 등록한다.
*/

// model
const User = require('../../model/user.js')
const Error = require('../../model/error.js')
const StandardMatch = require('../../model/standardMatch.js')

// // function 
// const createStandardMatch = require('./createStandardMatch.js')

// const property
const matchingPool = []
const waitingPool = []
const maxStandardMatch = 50 // 표준 경기의 최대량
const minStandardMatch = 30 // 표준 경기의 최소량
var lastRoomID = require('../../model/server.js')

module.exports = socket => 
  new Promise((resolve, reject) => {
    socket.on('add matching pool', () => {
      User.checkStatus(socket, 'Lobby') // 유저가 로비에 있는지 확인한다.
      .then((socket, user) => {
        user.info.status = 'Matching' // 유저의 상태를 Matching상태로 바꾼다.
        waitingPool.forEach(match => { // 만약 50명이 차지 않아 대기중인 매치들을 둘러봐서
          if(match.info.users < maxStandardMatch) { // 만약에 50명이 차지 않았다면
            return match.info.users.push(socket.user.info.id) // 유저를 넣어 둔다.
          } else {
            matchingPool.push(socket) // 매칭 풀에 socket을 등록한다.
          }
        })
        if(matchingPool.length === minStandardMatch) { // 만약 최소 인원만큼 사람들이 모였을 경우
          createStandardMatch(matchingPool)
          .then(match => {
            waitingPool.push(match)
          })
        }
      })
      .catch(reject)
    })
    resolve(socket)
  })

const clearmatchingPool = () => {
  matchingPool = matchingPool.slice(50)
}