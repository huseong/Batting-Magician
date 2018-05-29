// TODO: 다른 유저들과의 정보를 저장하는 것 이다.

const mongoose = require('mongoose')
const User = require('../../user.model')
const Friend = require('./subModel/friend.subModel')

const relationSchema = new mongoose.Schema({
  friends : [Friend], // 유저의 친구 목록. 친구 유저의 meta.id가 들어간다.
  block : [String], // 친구 요청을 차단한 유저의 목록. 해당 유저의 이름이 들어간다.
  myRequestList : [{
    name : String,
    sendTime : String
   }], // 내가 요청한 유저의 목록, 해당 유저의 이름이 들어간다.
  otherUserRequestList : [{
    name : String,
    sendTime : String
   }] // 다른 사람들이 내게 요청한 유저의 목록
})

relationSchema.create = () => {
  return {
    friends : [],
    block : [],
    myRequestList : [],
    otherUserRequestList : []
  }
}

relationSchema.sendData = require('./function/sendData')

relationSchema.setNewFriends = 

module.exports = relationSchema