/* TODO: 경마장 각각에 대한 모듈이다.
*/

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  roomID : Number,
  roomName : String,
  roomUser : Array,
  roomType : String,
  status : String
})

let currentRoomID = 1000 // 방 번호이다. 매번 하나씩 늘어난다.


const room = mongoose.model('room', room)