/* TODO: 경마장 각각에 대한 모듈이다.
*/

// module
require('date-utils')
const mongoose = require('mongoose')

// model
const Error = require('./error.js')

const meta = new mongoose.Schema({
  id : Number, // 해당 아레나에 대한 고유 식별자이다.
  server : String, // 이 아레나가 속한 서버의 이름
  date : Date, // 매치 진행 날짜
  users : Array // 유저들의 순수 아이디가 들어간다.
})

const user = new mongoose.Schema({
  log : String
})

const map = new mongoose.Schema({
  sequence : Array,
  log : String
})

const schema = new mongoose.Schema({
  meta : meta,
  info : {
    users : { // 유저의 아이디들이 들어간다.
      red : Array,
      blue : Array,
      green : Array,
      yellow : Array
    }, 
    chatLog : String // 채팅 로그들이 들어간다.
  }
})

schema.statics.generateNewArena = (manager, tempMatch) => 
  new Promise((resolve, reject) => {
    const meta = {
      id : manager.nextMatchID++,
      server : manager.serverName.id,
      date : (new Date()).toFormat('YYYY-MM-DD HH24:MI:SS'),
      users : tempMatch.map(matchUser => matchUser.user.meta.id)
    }
    const newArena = new schema({
      meta : meta,
      info : {
      }
    })
  })

const room = mongoose.model('arena', schema)

module.exports = room