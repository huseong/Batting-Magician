// TODO: 다른 유저들과의 정보를 저장하는 것 이다.

const mongoose = require('mongoose')

const relationSchema = new mongoose.Schema({
  friend : Array, // 유저의 친구 목록. 친구 유저의 meta.id가 들어간다.
  block : Array // 차단한 유저의 목록. 친구 유저의 meta.id가 들어간다.
})

relationSchema.statics.create = () => {
  return {
    friend : [],
    block : []
  }
}

module.exports = relationSchema