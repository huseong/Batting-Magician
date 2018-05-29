const mongoose = require('mongoose')

const friendSchema = new mongoose.Schema({
  id : String, // 친구 고유의 아이디. 프로필과 이름을 읽어오는데 사용됨
  friendID : Number, // 내 안에서 친구의 ID. 채팅을 주고 받을 때 사용됨
  chat : [{
    time : Date, // 채팅을 보낸 시간
    text : String, // 채팅 텍스트
    isSend : Boolean // 내가 보냈는지. true면 내가 보낸 것 false면 상대가 보낸 것 
  }]
})

module.exports = friendSchema