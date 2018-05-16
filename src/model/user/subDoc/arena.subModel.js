const mongoose = require('mongoose')

const arenaSchema = new mongoose.Schema({
  gameID : Number, // 유저가 속한 게임
  flag : Number, // 현재 점수
  tier : Number, // 플레이어의 티어
  isPlayingArena : Boolean, // 유저의 현재 게임 플레이 여부
})

arenaSchema.statics.create = () => {
  return {
    gameID : -1,
    flag : 0,
    tier : 0,
    isPlayingArena : false
  }
}
  

module.exports = arenaSchema



exports.create = {

}