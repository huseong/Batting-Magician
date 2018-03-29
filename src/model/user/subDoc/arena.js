const mongoose = require('mongoose')

exports.schema = new mongoose.Schema({
  flag : Number, // 현재 점수
  tier : Number // 플레이어의 티어
})

exports.create = new exports.schema({
  flag : 0,
  tier : 0
})