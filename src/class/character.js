const randomDice = require('../util/randomDice.js')

class Character {
  constructor(io, roomID, num) {
    this.meta = {
      io : io, // io 모듈
      roomID : roomID, // 이 슬라임이 속한 방의 ID
      num : num, // 이 슬라임의 숫자
      isGameEnd : false,
      matchWeight : 100 // 경기에 참가자로 당첨될 확률
   }
    this.move = { // 이동에 관한 정보
      speed : 4, // 이 캐릭터의의 점프당 이동 속도
      jumpSpeed : 0.4, // 이 캐릭터의 점프 간격
      location : 0, // 이 캐릭터의 현 위치
      nextLodgment : 150, // 이 캐릭터의 다음 거점까지의 위치
      diceWeight : [...Array(6)].fill(100), // 이 캐릭터의 주사위 가중치
      diceAmountSum : 600, // 이 가중치들의 합
      delta : [...Array(6)].map((val, index) => ++index * -0.03) // 해당 주사위가 나왔을 때 점프 속도가 증가할 양
    }
    this.health = {
      max : 250, // 최대 체력
      current : 250, // 현재 체력
      diceWeight : [...Array(6)].fill(100), // 이 슬라임의 주사위 가중치
      diceAmountSum : 600,
      delta : [...Array(6)].map((val, index) => ++index * 10) // 해당 주사위가 나왔을 때 체력이 증가할 양
    }
    this.count = 10
  }
  
  jump() {
    this.move.location += this.move.speed
    if(this.move.jumpSpeed < 0.4) {
      this.move.jumpSpeed += (0.4 - this.move.jumpSpeed) * 0.1
    }
    if(this.count > 0) {
      this.count --
    } else {
      this.count = 10
      let param = {
        num : this.meta.num,
        location : this.move.location,
      }
      this.meta.io.to(this.meta.roomID).emit('pos correction', param)
    }
    setTimeout(() => this.jump(), this.move.jumpSpeed * 1000)
  }

  posCorrection() { // 위치를 보정해준다.
    setTimeout(() => this.posCorrection(), 3000)
    let param = {
      num : this.meta.num,
      location : this.move.location
    }
    this.meta.io.to(this.meta.roomID).emit('pos correction', param)
  }
  
  start() {
    this.meta.io.to(this.meta.roomID).emit('game start', { serverTime : this.meta.serverTime })
    setTimeout(() => {
      this.jump()
    }, this.move.jumpSpeed * 1000)
  }

  enterLodgement() { // 거점에 들어갈 때, 주사위를 굴려 속도가 늘어나고 체력을 회복한다.
    return new Promise(resolve => {
      let moveDice = randomDice(this.move.diceWeight, this.move.diceAmountSum)
      this.move.jumpSpeed += this.move.delta[moveDice]
      let healthDice = randomDice(this.health.diceWeight, this.health.diceAmountSum)
      this.health.current += this.health.delta[healthDice]
      let lodgementInfo = { // 거점에 들어와서 일어난 일을 보내준다.
        num : this.meta.num,
        jumpSpeed : this.move.jumpSpeed,
        health : this.health.current
      }
      this.meta.io.to(this.meta.roomID).emit('lodgement', lodgementInfo)
      resolve()
    })
  }
}

module.exports = Slime