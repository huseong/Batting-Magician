const mongoose = require('mongoose')

const deckSchema = new mongoose.Schema({
  cardList : [{id : Number, class : Number, level : Number, exp : Number }], // 보유한 카드들의 리스트
  deckList : [ { name : String, list : [{ id : Number, level : Number }]} ], // 덱 리스트
  defaultDeckIndex : Number // 기본 덱 인덱스. 만약 덱이 아무것도 없을경우 -1이다.
})

deckSchema.statics.create = () => {
  return {
    cardList : [],
    defaultDeckIndex : -1, 
    deck : [] 
  }
}

module.exports = deckSchema