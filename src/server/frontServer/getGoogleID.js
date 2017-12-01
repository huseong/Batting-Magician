/* TODO:
유저의 GoogleID를 받은 뒤 기존에 가입한 유저인지 확인한다.
만약 아니라면 가입 창을 띄우고 맞다면 로비 서버로 이동한다.
*/
const User = require('../../model/user.js')
const Hack = require('../../model/hack.js')
const signUp = require('./signUp.js')
const toLobbyServer = require('./toLobbyServer.js')
module.exports = socket => 
  new Promise((resolve, reject) => {
    if(!socket.isVersionChecked)
      Hack.create('Version Check Skip')
    socket.emit('google id') // 구글 아이디 요청
    socket.on('google id', ({id}) => {
      User.findOne({userInfo : { id : id }}, (err, user) => {
        if(err) console.log('DB Error : ', err)
        if(!user) { // 만약 유저를 찾을 수 없다면 -> 아직 가입 안한 유저라면
          return signUp(socket, id)
          .then(toLobbyServer)
          .catch(reject)
        }
        user.lastEnter = Date.now()
        toLobbyServer(socket, user)
      })
    })
  })