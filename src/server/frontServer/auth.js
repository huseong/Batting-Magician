/* TODO:
유저의 GoogleID를 받은 뒤 기존에 가입한 유저인지 확인한다.
만약 아니라면 가입 창을 띄우고 맞다면 로비 서버로 이동한다.
*/

// model
const User = require('../../model/user.js')
const Hack = require('../../model/hack.js')
const Error = require('../../model/error.js')
const signUp = require('./signUp.js')
const getGoogleID = require('../../util/getGoogleID.js')
module.exports = socket => 
  new Promise((resolve, reject) => {
    // TODO: user의 상태를 확인한다.
    const userCheck = id => 
      User.findOne({ 'meta.id' : id }, (err, user) => {
        if(err) { // 에러가 발생하면 User DB 에 저장함.
          Error.create('User DB Error')
          return reject(socket)
        }
        if(!user)  // 만약 유저를 찾을 수 없다면 -> 아직 가입 안한 유저라면
          return signUp(socket, id).then(toLobbyServer).catch(reject)
        if(user.info.status !== 'Enter')
          console.log('애 왜 Enter 아님?')
        user.lastEnter = Date.now()
        user.save(err => {
          if(err) {
            Error.create('User DB Error');
            return reject(socket);
          }})
        toLobbyServer({socket : socket, user : user}).catch(reject)
      })
    if(!socket.isVersionChecked) {
      Hack.create('Version Check Skip')
      return reject(socket)
    }
    getGoogleID(socket)
    .then(userCheck)
  })

// TODO: 유저를 로비서버로 보낸다.
const toLobbyServer = param => 
  new Promise((resolve, reject) => {
    const socket = param.socket
    const user = param.user
    user.info.status = 'Lobby'
    user.save(err => {
      if(err) {
        Error.create('User DB Error')
        return reject(socket)
      }
    })
    console.log('로비 서버로 이동하시오')
    socket.emit('to lobby server')
    setTimeout(() => reject(socket), 1000) // 1초 뒤에 연결을 종료함
  })