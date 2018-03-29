// module
const mongoose = require('mongoose')

exports.schema = new mongoose.Schema({
  characterList : [{id : Number, class : Number, level : Number, exp : Number }], // 보유한 캐릭터들의 리스트
  currentCharacter : Number // 현재 캐릭터
})

exports.create = new exports.schema({
  characterList : [{id : 0, class : 0, level : 1, exp : 0 }], // 기본으로 개 넣기
  currentCharacter : 0 // 현재 캐릭터의 인덱스
})
