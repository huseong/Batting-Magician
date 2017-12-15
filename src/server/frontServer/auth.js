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
    if(!socket.isVersionChecked) {
      Hack.create('Version Check Skip')
      return reject(socket)
    }
    getGoogleID(socket)
    .then(userCheck)
  })
// TODO: user의 상태를 확인한다.
const userCheck = id => 
  User.findOne({ userInfo : { id : id }}, (err, user) => {
    if(err) { // 에러가 발생하면 User DB 에 저장함.
      Error.create('User DB Error')
      return reject(socket)
    }
    if(!user)  // 만약 유저를 찾을 수 없다면 -> 아직 가입 안한 유저라면
      return signUp(socket, id).then(toLobbyServer).catch(reject)
    user.lastEnter = Date.now()
    user.save(err => { Error.create('User DB Error');  return reject(socket); })
    toLobbyServer(socket, user)
  })
// TODO: 유저를 로비서버로 보낸다.
const toLobbyServer = (socket, user) => {
  user.info.status = 'Lobby'
  socket.emit('to lobby server')
  return socket.disconnect(true)
}