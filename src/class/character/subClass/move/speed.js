const customMath = require('../../../../util/customMath')

class Speed {
  constructor(socket) {
    this.setMetaValue(socket)
    this.setDefaultValue()
  }

  setMetaValue(socket) {
    this.socket = socket
  }

  // 기본 값을 정한다.
  setDefaultValue() {
    this.standardSpeed = 0.075
    this.setMaxSpeed(0.15)
    this.setSpeed(0)
  }

  // 최고로 올릴 수 있는 속도
  setMaxSpeed(value) {
    this.maxSpeed = value
    this.socket.emit('update max speed', { value : this.maxSpeed })
  }

  // 현재 속도를 정하기
  setSpeed(value) {
    console.log(value)
    this.currentSpeed = customMath.clamp(value, 0, this.maxSpeed)
    this.socket.emit('update speed', { value : this.currentSpeed })
  }

  setSpeedDelta(delta) {
    this.setSpeed(this.currentSpeed + delta)
  }
}

module.exports = Speed