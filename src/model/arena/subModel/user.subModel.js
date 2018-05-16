// module
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  meta : {
    id : String,
    name : String,
    profile : String,
  },
  info : {
    deck : [{ id : Number, level : Number }], // 현재 사용하는 덱.
    character : {id : Number, class : Number, level : Number, exp : Number }, // 사용하는 캐릭터
    sequence : Number, // 순서
    flag : Number,
    chatLog : String
  },
  log : String
})

schema.statics.create = (user, elementIndex) => new schema({
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

// ShortView를 위해 만들어야 하는 Info
schema.static.generateInfoForShortView = function() {
  return {
    name : this.meta.name,
    profile : this.meta.profile,
    flag : user.info.flag,
    sequence : user.info.sequence
  }
}

module.exports = schema