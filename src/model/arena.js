/* TODO: 경마장 각각에 대한 모듈이다.
*/

// module
require('date-utils')
const mongoose = require('mongoose')

// model
const Error = require('./error.js')

const schema = new mongoose.Schema({
  meta : {
    id : Number, // 해당 아레나에 대한 고유 식별자이다.
    server : String, // 이 아레나가 속한 서버의 이름
    date : Date,
    tier : Number // 해당 아레나가 몇 티어에서 진행된 아레나인지
  },
  info : {
    userList : Array, // 유저의 아이디들이 들어간다.
    chatLog : String // 채팅 로그들이 들어간다.
  }
})

schema.statics.generateNewArena = async function (server, param) {
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

const room = mongoose.model('arena', schema)

module.exports = room