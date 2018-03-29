// module
const mongoose = require('mongoose')
require('date-utils')

// model
const Hack = require('./hack.js')
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
  game : {
    id : Number, // 유저가 속한 게임
    isGameplay : Boolean, // 유저의 현재 게임 플레이 여부
    character : String // 유저가 현재 쓰는 캐릭터
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
      meta : meta.create(id, name),
      info : {
        wealth : wealth.create(),
        relation : relation.create(),
        arena : arena.create(),
        deck : deck.create(),
        status : 'Lobby'
      },
      game : {
        id : -1,
        isGameplay : false,
        haveCharacter : [...Array(10)].fill(false),
        character : 'Dog'
      }
    })
    newUser.save(err => {
      if(err)
        Error.create('User DB Error in Save User : ', err)
    })
    resolve(newUser)
  })

// TODO: 유저가 해당 상태인지를 확인한다.
// 만약 그 상태가 아니라면 핵 리스트에 추가한다.
schema.statics.checkStatus = (socket, status) =>
  new Promise((resolve, reject) => {
    socket.emit('get google')
    socket.isChecked = false
    socket.on('get google', ({id}) => {
      if(!id) {
        Hack.create('ID Not Found')
        return reject('can not find id')
      }
      user.findOne({'meta.id' : id}, (err, user) => {
        if(!user) { // 이거 못찾으면 크랙유저
          Hack.create('User Not Found', null, id)
          return reject('Location Hack')
        }
        if(user.info.status === status) {
          resolve(user)
        } else {
          Hack.create('Location Hack', user, id)
          return reject('Location Hack')
        }
      })
    })
  })

schema.methods.sendData = function() {
  let param = {
    meta : {
      name : this.meta.name,
      epithet : this.info.epithet,
      profile : this.meta.profile
    },
    wealth : this.info.wealth,
    arena : this.info.arena
  }
  return param
}

  const user = mongoose.model('user', schema)
module.exports = user