const customMath = require('../../../util/customMath')

const Speed = require('./move/speed')
const Accel = require('./move/accel')
const Jump = require('./move/jump')

const status = {
  Optimum : 1, // 최적
  OverSpeed : 2, // 무리
  Overtax : 3, // 과속
  Exhaustion : 4, // 탈진
  Sprint : 5 // 전력 질주
}

class MoveInfo {
  constructor (socket, healthInfo) {
    this.socket = socket
    this.speed = new Speed(socket)
    this.accel = new Accel(socket, this)
    this.jump = new Jump(socket, this, healthInfo)
    this.currentProgress = 0

      // location : {
      //   x : 0, y : 0
      // } // 이 캐릭터의 현 위치
  }

  // 20FPS 로 호출됨
  update() {
    this.accel.update()
    this.jump.update()
  }

  jump() {
    this.socket.emit('jump')
    this.reduceStemina()
  }
}

module.exports = MoveInfo
