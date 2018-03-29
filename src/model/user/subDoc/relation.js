const mongoose = require('mongoose')

exports.schema = new mongoose.Schema({
   // 다른 유저들과의 정보를 저장하는 것 이다.
  friend : Array, // 유저의 친구 목록. 해당 유저의 meta.id가 들어간다.
  block : Array // 차단한 유저의 목록. 해당 유저의 meta.id가 들어간다.
})

exports.create = () =>
  new exports.schema({
    friend : [],
    block : []
  })