// module
const mongoose = require('mongoose')

exports.schema = new mongoose.Schema({
  money : Number,
  jam : Number,
  card : [{id : Number, level: Number, exp: Number}], // 보유한 카드의 목록
  profile : [String] // 보유한 프로필의 목록
})

exports.create = () => 
  exports.schema({
    money : 1000,
    jam : 0,
    character : [],
    profile : ['Dog']
  })