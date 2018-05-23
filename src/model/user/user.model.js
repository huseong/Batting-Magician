// module
const mongoose = require('mongoose')
require('date-utils')

// model
const Crack = require('../etc/crack.model.js')
const Error = require('../etc/error.model.js')

// subDoc
const meta = require('./subDoc/meta.subModel.js')
const wealth = require('./subDoc/wealth.subModel.js')
const relation = require('./subDoc/relation.subModel.js')
const arena = require('./subDoc/arena.subModel.js')
const deck = require('./subDoc/deck.subModel.js')

const schema = new mongoose.Schema({
  meta : meta, // 유저에 대한 메타 정보
  info : {
    wealth : wealth, // 보유한 재산에 관련된 것
    relation : relation, // 
    arena : arena, // 아레나에 관한 것
    deck : deck,
    achieve : Number, // 유저가 성취한 업적
    status : String, // 유저의 상태
  },
})

schema.statics.create = (id, name) => 
  new Promise((resolve, reject) => {
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
      if(!err)
        resolve(newUserModel)
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
      userModel.findOne({'meta.id' : id}, (err, userModel) => {
        if(!userModel) // 이거 못찾으면 크랙유저
          return reject(Crack.create('Can Not Find User In Check Status', id))
        if(userModel.info.status === status)
          return resolve(userModel)
        else
          return reject(Crack.create('User Location Not Correct', id))
      })
    })
  })

// TODO: 사용자가 게임을 플레이한다는 것을 DB 상에서 업데이트함.
schema.methods.setUserGamePlaying = function(gameID) {
  return new Promise(resolve => {
    user.info.arena.gameID = gameID
    user.info.arena.isGamePlaying = true
    user.info.status = 'Arena'
    user.save(err => {
      if(!err)
        resolve()
    })
  })
}

schema.methods.sendDataForLobby = function(socket) {
  return new Promise(resolve => {
    let param = {
      meta : {
        name : this.meta.name,
        profile : this.meta.profile
      },
      wealth : this.info.wealth,
      arena : this.info.arena
    }
    socket.emit('res user data', param)
    resolve(socket)
  })
}

const userModel = mongoose.model('user', schema)
module.exports = userModel