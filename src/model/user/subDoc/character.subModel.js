// module
const mongoose = require('mongoose')

const characterSchema = new mongoose.Schema({
  characterList : [{id : Number, class : Number, level : Number, exp : Number }], // 보유한 캐릭터들의 리스트
  currentCharacterIndex : Number // 현재 사용중인 캐릭터
})

characterSchema.create = () => {
  return {
    characterList : [{id : 0, class : 0, level : 1, exp : 0 }], // 기본으로 귀여운 강아지 넣기
    currentCharacter : 0 // 현재 사용중인 캐릭터의 인덱스
  }
}

module.exports = characterSchema
