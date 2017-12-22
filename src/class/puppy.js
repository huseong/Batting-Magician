const Character = require('./character.js')

class Puppy extends Character {
  constructor(io, roomID, num) {
    super.constructor(io, roomID, num)
    this.meta.matchWeight = 110 // 귀여운 강아지는 참가자로 당첨될 확률이 10% 높다.
  }
}