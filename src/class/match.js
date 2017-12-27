// util
const setTimer = require('../util/setTimer.js')

class Match {
  constructor(io) {
    this.meta = {
      io : io,
      
    }
    this.match = match // match Mongoose Module
  }

  // 시작 하기 전에 대기 시간이다. 통상 20초를 대기한다.
  waitForStart () {
    this.time = 20
    setTimer(this.time)
    .then(startGame) 
  }

  startGame () {
    this.createSlime()
  }

  createSlime() {
    this.slimeArray = [...Array(8)].map((slime, index) => new Slime(io, '1000', index))
  }
}