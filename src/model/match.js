/* TODO: 경마장 각각에 대한 모듈이다.
*/

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  meta : {
    id : Number, // 해당 방에 대한 고유 식별자이다.
    date : Date,
    name : String,
    type : String
  },
  info : {
    user : Array,
    status : String,
    horses : Array
  }
})

let currentRoomID = 1 // 방 번호이다. 매번 하나씩 늘어난다.


const room = mongoose.model('room', room)