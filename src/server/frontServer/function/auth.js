/* TODO:
유저의 GoogleID를 받은 뒤 기존에 가입한 유저인지 확인한다.
만약 아니라면 가입 창을 띄우고 맞다면 로비 서버로 이동한다.
*/

// model
const User = require('../../../model/user/user.model.js')
const Crack = require('../../../model/etc/crack.model.js')
const Error = require('../../../model/etc/error.model.js')

// function
const signUp = require('./signUp.js')

// util
const getGoogleID = require('../../../util/getGoogleID.js')

module.exports = socket => 
  new Promise((resolve, reject) => {
    // TODO: user의 상태를 확인한다.
    isVersionChecked(socket)
    .then(getGoogleID)
    .then(id => userCheck(socket, id))
    .then(resolve)
    .catch(reject)
  })

// TODO: Version이 확인 되었는지 확인한다.
const isVersionChecked = socket => 
  new Promise((resolve, reject) => {
    if(!socket.isVersionChecked) { // socket에서 version Check를 수행했는지 확인한다.
      Crack.create('Version Check Skip')
      return reject('Crack')
    }
    resolve(socket)
  })

// TODO: 유저의 상태를 확인한다. 
const userCheck = (socket, id) => 
  new Promise((resolve, reject) => {
    User.findOne({ 'meta.id' : id }, (err, user) => {
      if(err) { // 에러가 발생하면 User DB 에 저장함.
        Error.create('User DB Error')
        return reject('DB Error')
      }
    if(!user)  // 만약 유저를 찾을 수 없다면 -> 아직 가입 안한 유저라면
      return signUp(socket, id).then(resolve).catch(reject)
    user.meta.lastEnter = Date.now() // 가입한 유저라면 최근 접속 시간을 갱신하고 저장한다.
    user.save(err => {
      if(err) {
        Error.create('User DB Error');
        return reject('DB Error');
      } else
        return resolve(user)
    })
  })
})
