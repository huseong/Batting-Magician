const randomDice = require('../../util/randomDice.js')

class Slime {
  constructor(io, roomID, num) {
    this.meta = {
      io : io, // io 모듈
      roomID : roomID, // 이 슬라임이 속한 방의 ID
      num : num // 이 슬라임의 숫자
    }
    this.info = {
      speed : 10, // 이 슬라임의 초당 이동 속도
      location : 0, // 이 슬라임의 현 위치
      nextLodgment : 150, // 이 슬라임의 다음 거점이다.
      diceWeight : [...new Array(6)].fill(100), // 이 슬라임의 주사위 가중치
      diceAmountSum : 600, // 이 가중치들의 합
      speedWeight  : [...new Array(6)].map((val, index) => 0.5 * (index+1)) // 해당 주사위가 나왔을 때 속도가 증가할 양
    }
  }

  set location(val) {
    this.info.location = val
    if(val >= this.info.nextLodgment) { // 만약 거점을 지났다면
      this.setSpeed()
      this.info.nextLodgment += 150
    }
  }

  start() {
    setInterval(() => {
      this.info.location += this.info.speed * 0.4
    }, 0.4)
  }

  setSpeed() {
    let dice = randomDice()
    io.to(this.meta.roomID).emit('set speed')
  }
}

module.exports = Slime