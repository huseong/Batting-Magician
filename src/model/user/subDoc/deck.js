const mongoose = require('mongoose')

exports.schema = new mongoose.Schema({
  cardList : [{id : Number, class : Number, level : Number, exp : Number }], // 보유한 카드들의 리스트
  defaultDeckIndex : Number, // 기본 덱 인덱스. 없을경우 -1이다.
  deck : [ [{ id : Number, level : Number }] ] // 덱 리스트
})

exports.create = () =>
  new exports.schema({
    cardList = [],
    defaultDeckIndex : -1, 
    deck : [] 
  })