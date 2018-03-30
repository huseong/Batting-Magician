// module
const mongoose = require('mongoose')

exports.schema = new mongoose.Schema({
  meta : {
    id : String,
    name : String,
    epithet : String,
    profile : String
  },
  info : {
    deck : [{ id : Number, level : Number }], // 현재 사용하는 덱.
    character : {id : Number, class : Number, level : Number, exp : Number }, // 사용하는 캐릭터
    sequence : Number,
    chatLog : String
  },
  log : String
})

exports.create = user, elementIndex => new exports.schema({
  meta : {
    id : user.meta.id,
    name : user.meta.name,
    epithet : user.meta.epithet,
    user : user.meta.profile
  },
  info : {
    deck : user.info.deck.deckList[user.info.deck.defaultDeckIndex],
    character : user.info.character[user.info.character.currentCharacterIndex],
    sequence : elementIndex,
    chatLog : ""
  },
  log : ""
})