// module
const mongoose = require('mongoose')

const wealthSchema = new mongoose.Schema({
  money : Number,
  jam : Number,
  profile : [String] // 보유한 프로필의 목록
})

wealthSchema.statics.create = () => {
  return {
    money : 1000,
    jam : 0,
    profile : ['The Light of Dimigo'] // 기본으로 디미고 프로필을 넣어놓는다.
  }
} 