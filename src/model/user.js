// module
const mongoose = require('mongoose')
require('date-utils')

// model
const Hack = require('./hack.js')
const Error = require('./error.js')

const schema = new mongoose.Schema({
  meta : { // 유저에 대한 메타 정보
    id : String, // 유저의 식별자. Google ID이다.
    name : String, // 유저의 이름
    isBanned : Boolean, // 유저가 밴이 됬는지
    lastEnter : Date, // 유저가 마지막으로 접속한 날짜
    profile : Number // 유저가 가진 프로필
  },
  info : {
    room : {
      roomID : Number, // 유저가 방에 있다면 방의 이름
      bannedRoomID : [Number] // 유저가 밴된 방의 ID 배열
    },
    exp : {
      level : Number, // 유저 레벨
      forNextLevel : Number, // 다음 레벨업을 위해 필요한 경험치
      expAmount : Number // 유저의 현재 보유한
    },
    users : { // 다른 유저들과의 정보를 저장하는 것 이다.
      friend : Array, // 유저의 친구 목록. 해당 유저의 meta.id가 들어간다.
      block : Array // 차단한 유저의 목록. 해당 유저의 meta.name이 들어간다.
    },
    ticket : Number, // 유저가 가진 티켓의 수
    achieve : Number, // 유저가 성취한 업적
    money : Number, // 유저가 가진 돈
    status : String, // 유저의 상태
    matchType : String, // 참가한 방의 매치 종류

  },
  game : {
    isGameplay : Boolean,
    haveCharacter : Array, // 유저가 해당 캐릭터를 가졌는지
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
      meta : {
        id : id,
        name : name,
        isBanned : false,
        lastEnter : (new Date()).toFormat('YYYY-MM-DD HH24:MI:SS')
      },
      info : {
        level : 1,
        ticket : 6,
        achieve : 0,
        money : 1000,
        roomID : '',
        status : 'Lobby',
      },
      game : {
        isGameplay : false,
        haveCharacter : [...Array(10)].fill(false),
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
    name : this.meta.name,
    money : this.info.money,
    achieve : this.info.achieve
  }
  return param
}

  const user = mongoose.model('user', schema)
module.exports = user