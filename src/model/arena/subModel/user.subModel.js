// module
const mongoose = require('mongoose')

exports.schema = new mongoose.Schema({
  meta : {
    id : String,
    name : String,
    profile : String,
  },
  info : {
    deck : [{ id : Number, level : Number }], // 현재 사용하는 덱.
    character : {id : Number, class : Number, level : Number, exp : Number }, // 사용하는 캐릭터
    sequence : Number,
    flag : Number,
    chatLog : String
  },
  log : String
})

exports.create = user, elementIndex => new exports.schema({
  meta : {
    id : user.meta.id,
    name : user.meta.name,
    profile : user.meta.profile
  },
  info : {
    deck : user.info.deck.deckList[user.info.deck.defaultDeckIndex],
    character : user.info.character[user.info.character.currentCharacterIndex],
    sequence : elementIndex,
    flag : user.info.arena.flag,
    chatLog : ""
  },
  log : ""
})

exports.generateInfo = user => {
  return {
    name : user.name,
    profile : user.profile,
    flag : user.info.flag,
    sequence : user.info.sequence
  }
}