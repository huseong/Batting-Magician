/* TODO: 경마장 각각에 대한 모듈이다.
*/

const mongoose = require('mongoose')
const Error = require('./error.js')
require('date-utils')
const schema = new mongoose.Schema({
  meta : {
    id : Number, // 해당 방에 대한 고유 식별자이다.
    serverName : String,
    date : Date,
    name : String,
    type : String
  },
  info : {
    users : [String],
    status : String,
    horses : [Number]
  }
})

let currentRoomID = 1 // 방 번호이다. 매번 하나씩 늘어난다.

schema.statics.create = (server, type, users) => {
  let newMatch = new room({
    meta : {
      id : server.getRoomID,
      serverName : server.info.name,
      date : (new Date()).toFormat('YYYY-MM-DD HH24:MI:SS'),
      name : '후성배 경마 경주',
      type : type
    },
    info : {
      users : users.map(user => user.id),
      status : 'Wait',
      
    }
  })
}

const room = mongoose.model('room', room)

module.exports = room