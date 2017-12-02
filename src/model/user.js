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
    status : String
  }
})

schema.statics.create = (id, name) => {
  const date = new Date()
  const newUser = new user({
    info : {
        id : id,
        name : name,
        money : 0,
        isBanned : false,
        lastEnter : date.toFormat('YYYY-MM-DD HH24:MI:SS')
    },
    currentStatus : {
        server : 'Lobby'
    }
  })
  newUser.save(err => {
      Error.create('User DB Error')
  })
  return newUser
}

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
          reject(socket, user)
        }
      })
    })
  })

const user = mongoose.model('user', schema)
module.exports = user