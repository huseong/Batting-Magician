// util
// const randomDice = require('../util/randomDice')

// function
// const customMath = require('../../util/customMath')

// subClass
// const Meta = require('./subClass/meta.subClass')
const Health = require('./subClass/health.subClass')
const Move = require('./subClass/move.subClass')

class Character {
  constructor(socket) {
    this.health = new Health(socket)
    this.move = new Move(socket, this.health)
    setInterval(() => this.move.update(), 50)
  }

  // start() {
  //   this.meta.io.to(this.meta.roomID).emit('game start', { serverTime : this.meta.serverTime })
  //   setTimeout(() => {
  //     this.jump()
  //   }, this.move.jumpSpeed * 1000)
  // }
  
  // jump() {
  //   this.move.location += this.move.speed
  //   if(this.move.jumpSpeed < 0.4) {
  //     this.move.jumpSpeed += (0.4 - this.move.jumpSpeed) * 0.1
  //   }
  //   if(this.count > 0) {
  //     this.count --
  //   } else {
  //     this.count = 10
  //     let param = {
  //       num : this.meta.num,
  //       location : this.move.location,
  //     }
  //     this.meta.io.to(this.meta.roomID).emit('pos correction', param)
  //   }
  //   setTimeout(() => this.jump(), this.move.jumpSpeed * 1000)
  // }


  // diceWeight : [...Array(6)].fill(100), // 이 슬라임의 주사위 가중치
  // diceAmountSum : 600,
  // delta : [...Array(6)].map((val, index) => ++index * 10) // 해당 주사위가 나왔을 때 체력이 증가할 양
  // posCorrection() { // 위치를 보정해준다.
  //   setTimeout(() => this.posCorrection(), 3000)
  //   let param = {
  //     num : this.meta.num,
  //     location : this.move.location
  //   }
  //   this.meta.io.to(this.meta.roomID).emit('pos correction', param)
  // }

  // enterLodgement() { // 거점에 들어갈 때, 주사위를 굴려 속도가 늘어나고 체력을 회복한다.
  //   return new Promise(resolve => {
  //     let moveDice = randomDice(this.move.diceWeight, this.move.diceAmountSum)
  //     this.move.jumpSpeed += this.move.delta[moveDice]
  //     let healthDice = randomDice(this.health.diceWeight, this.health.diceAmountSum)
  //     this.health.current += this.health.delta[healthDice]
  //     let lodgementInfo = { // 거점에 들어와서 일어난 일을 보내준다.
  //       num : this.meta.num,
  //       jumpSpeed : this.move.jumpSpeed,
  //       health : this.health.current
  //     }
  //     this.meta.io.to(this.meta.roomID).emit('lodgement', lodgementInfo)
  //     resolve()
  //   })
  // }
}

module.exports = Character