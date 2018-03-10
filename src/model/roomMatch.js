/* TODO: 경마장 각각에 대한 모듈이다.
*/

// module
require('date-utils')
const mongoose = require('mongoose')

// model
const Error = require('./error.js')

const roomID = [... new Array(1000)].fill(false)

const createRoomID = () => {
  while(true) {
    let id = Math.floor(Math.random() * 1000)
    if(!roomID[id]) {
      roomID[id] = true
      return id
    }
  }
}

const schema = new mongoose.Schema({
  meta : {
    id : Number, // 해당 방에 대한 고유 식별자이다.
    server : String, // 이 방이 속한 서버의 이름
    date : Date,
  },
  info : {
    name : String,
    userPersonnel : Number,
    runnerPersonnel : Number,
    isSecret : Boolean,
    isBetting : Boolean,
    isMagic : Boolean,
  }
})

const room = mongoose.model('room match', schema)

schema.statics.create = (server, param) =>
  new Promise((resolve, reject) => {
    let newMatch = new room({
      meta : {
        id : createRoomID(),
        serverName : server,
        date : (new Date()).toFormat('YYYY-MM-DD HH24:MI:SS'),
      },
      info : param})
    newMatch.save(err => {
      if(err) {
        Error.create('Match DB Error')
        reject()
      }
    })
    console.log('방 생성이 정상적으로 완료됨. 만들어진 방 : ' + param)
    return resolve(newMatch)
})

module.exports = room