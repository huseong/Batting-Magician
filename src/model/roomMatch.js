/* TODO: 경마장 각각에 대한 모듈이다.
*/

// module
require('date-utils')
const mongoose = require('mongoose')

// model
const Error = require('./error.js')

const roomID = [... new Array(1000)].fill(false)

const createRoomID = () => 
  new Promise(resolve => {
    while(true) {
      let id = Math.floor(Math.random() * 1000)
      if(!roomID[id]) {
        roomID[id] = true
        return resolve(id)
      }
    }
  })

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

schema.statics.generateNewMatch = async function (server, param) {
    console.log('방만들기 노리 ㅅ ㅣ작~')
    const id = await createRoomID()
    let newMatch = new room({
      meta : {
        id : id,
        serverName : server,
        date : (new Date()).toFormat('YYYY-MM-DD HH24:MI:SS'),
      },
      info : param})
    newMatch.save(err => {
      if(err) {
        Error.create('Match DB Error')
        // reject()
      }
    })
    console.log('방 생성이 정상적으로 완료됨. 만들어진 방 : ' + param)
    return newMatch
}

const room = mongoose.model('room match', schema)

module.exports = room