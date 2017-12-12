const mongoose = require('mongoose')
const Hack = require('./hack.js')
const Error = require('./error.js')
require('date-utils')
const schema = new mongoose.Schema({
  info : {
    id : String,
    name : String,
    money : Number,
    isBanned : Boolean,
    lastEnter : Date,
    status : String,
    friend : Array
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
          lastEnter : (new Date()).toFormat('YYYY-MM-DD HH24:MI:SS')
      },
      currentStatus : {
          server : 'Lobby'
      }
    })
    newUser.save(err => {
        Error.create('User DB Error')
    })
    return newUser
  })


// 유저가 해당 상태인지를 확인한다.
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