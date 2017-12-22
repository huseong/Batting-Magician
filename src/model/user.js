// module
const mongoose = require('mongoose')
require('date-utils')

// model
const Hack = require('./hack.js')
const Error = require('./error.js')

const schema = new mongoose.Schema({
  info : {
    id : String, // 유저의 식별자. Google ID이다.
    name : String, // 유저의 이름
    money : Number, // 유저가 가진 돈
    isBanned : Boolean, // 유저가 밴이 됬는지
    lastEnter : Date, // 유저가 마지막으로 접속한 날짜
    status : String, // 유저의 상태
    room : String, // 유저가 방에 있다면 방의 이름
    friend : Array // 유저의 친구 목록.
  },
  bank : {
    isSaving : Boolean, // 저축중인지
    savingDate : Date, // 저축 시작한지 얼마나 됬는지
    amount : Number // 저축한 양
  }
})

schema.statics.create = (id, name) => 
  new Promise((resolve, reject) => {
    user.findOne({ info : { name : name } }, (err, user) => { // 만약에 이미 같은 이름을 가진 유저가 있다면
      if(err) {
        Error.create('DB Error in User Create')
      }
      if(user) {
        return reject()
      }
    })
    const newUser = new user({
      info : {
          id : id,
          name : name,
          money : 0,
          isBanned : false,
          room : '',
          status : 'Lobby',
          lastEnter : (new Date()).toFormat('YYYY-MM-DD HH24:MI:SS')
      }
    })
    newUser.save(err => {
        Error.create('User DB Error')
    })
    return newUser
  })

// TODO: 유저가 해당 상태인지를 확인한다.
// 만약 그 상태가 아니라면 핵 리스트에 추가한다.
schema.statics.checkStatus = (socket, status) =>
  new Promise((resolve, reject) => {
    socket.emit('get google')
    socket.on('get google', ({id}) => {
      if(!id) {
        Hack.create('ID Not Found')
        return reject(socket)
      }
      user.findOne({info : { id : id}}, (err, user) => {
        if(!user) { // 이거 못찾으면 크랙유저
          Hack.create('User Not Found', null, id)
          return reject(socket)
        }
        if(user.info.status === status) {
          resolve(socket, user)
        } else {
          Hack.create('Location Hack', user, id)
          reject(socket)
        }
      })
    })
  })

const user = mongoose.model('user', schema)
module.exports = user