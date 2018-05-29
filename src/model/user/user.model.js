// module
const mongoose = require('mongoose')
require('date-utils')

// model
const Crack = require('../etc/crack.model.js')
const Error = require('../etc/error.model.js')

// subDoc
const metaSchema = require('./subDoc/meta.subModel')
const wealthSchema = require('./subDoc/wealth.subModel.js')
const relationSchema = require('./subDoc/relation/relation.subModel.js')
const arenaSchema = require('./subDoc/arena.subModel.js')
const deckSchema = require('./subDoc/deck.subModel.js')

const schema = new mongoose.Schema({
  meta : metaSchema, // 유저에 대한 메타 정보
  wealth : wealthSchema, // 보유한 재산에 관련된 것
  relation : relationSchema, // 
  arena : arenaSchema, // 아레나에 관한 것
  deck : deckSchema
})

schema.statics.create = (id, name) => 
  new Promise(async resolve => {
    const newUser = new User({
      meta : metaSchema.create(id, name),
      wealth : wealthSchema.create(),
      relation : relationSchema.create(),
      arena : arenaSchema.create(),
      deck : deckSchema.create()
    })
    newUser.save(err => {
      if(!err)
        resolve(newUser)
    })
  })

// TODO: 유저가 해당 상태인지를 확인한다.
// 만약 그 상태가 아니라면 핵 리스트에 추가한다.
schema.statics.checkStatus = (socket, status) =>
  new Promise((resolve, reject) => {
    socket.emit('get google') // 유저에 google ID를 요청한다.
    socket.isChecked = false 
    socket.on('get google', ({id}) => {
      if(!id)
        return reject(Crack.create('ID Not Found'))
      User.findOne({'meta.id' : id}, (err, user) => {
        if(!user) // 이거 못찾으면 크랙유저
          return reject(Crack.create('Can Not Find User In Check Status', id))
        if(user.meta.status === status)
          return resolve(user)
        else
          return reject(Crack.create('User Location Not Correct', id))
      })
    })
  })

// TODO: 사용자가 게임을 플레이한다는 것을 DB 상에서 업데이트함.
// schema.methods.setUserGamePlaying = function(gameID) {
//   return new Promise(resolve => {
//     user.info.arena.gameID = gameID
//     user.info.arena.isGamePlaying = true
//     user.meta.status = 'Arena'
//     user.save(err => {
//       if(!err)
//         resolve()
//     })
//   })
// }

// TODO: 클라이언트로 모든 정보를 한 번 보낸다.
schema.methods.sendAllData = function(socket) {
  return new Promise(resolve => {
    metaSchema.sendData(socket, this)
    .then(() => wealthSchema.sendData(socket, this))
    .then(() => relationSchema.sendData(socket, this))
    .then(resolve)
    resolve(this)
  })
}

const User = mongoose.model('user', schema)
module.exports = User