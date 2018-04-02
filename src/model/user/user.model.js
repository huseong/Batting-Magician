// module
const mongoose = require('mongoose')
require('date-utils')

// model
const Crack = require('./crack.js')
const Error = require('./error.js')

// subDoc
const meta = require('./subDoc/meta.js')
const wealth = require('./subDoc/wealth.js')
const relation = require('./subDoc/relation.js')
const arena = require('./subDoc/arena.js')
const deck = require('./subDoc/deck.js')

const schema = new mongoose.Schema({
  meta : meta.schema, // 유저에 대한 메타 정보
  info : {
    wealth : wealth.schema, // 보유한 재산에 관련된 것
    relation : relation.schema, // 
    arena : arena.schema, // 아레나에 관한 것
    deck : deck.schema,
    achieve : Number, // 유저가 성취한 업적
    status : String, // 유저의 상태
  },
})

schema.statics.create = (id, name) => 
  new Promise((resolve, reject) => {
    userModel.findOne({ info : { name : name } }, (err, foundUser) => { // 만약에 이미 같은 이름을 가진 유저가 있다면
      if(err) {
        Error.create('DB Error in User Create')
      }
      if(foundUser) { // 만약 유저가 존재한다면
        return reject()
      }
    })
    const newUserModel = new userModel({
      meta : meta.create(id, name),
      info : {
        wealth : wealth.create(),
        relation : relation.create(),
        arena : arena.create(),
        deck : deck.create(),
        status : 'Lobby'
      },
    })
    newUserModel.save(err => {
      if(err)
        Error.create('User DB Error in Save User : ', err)
    })
    resolve(newUserModel)
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
      userModel.findOne({'meta.id' : id}, (err, userModel) => {
        if(!user) // 이거 못찾으면 크랙유저
          return reject(Crack.create('Can Not Find User In Check Status', id))
        if(user.info.status === status)
          return resolve(userModel)
        else
          return reject(Crack.create('User Location Not Correct', id))
      })
    })
  })

schema.methods.sendDataForLobby = function() {
  let param = {
    meta : {
      name : this.meta.name,
      profile : this.meta.profile
    },
    wealth : this.info.wealth,
    arena : this.info.arena
  }
  return param
}

const userModel = mongoose.model('user', schema)
module.exports = userModel