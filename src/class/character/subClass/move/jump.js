class Jump {
  constructor(socket, moveInfo, healthInfo) {
    this.setMetaInfo(socket, moveInfo, healthInfo)
    this.setDefaultValue()
  }

  setMetaInfo(socket, moveInfo, healthInfo) {
    this.socket = socket
    this.moveInfo = moveInfo
    this.healthInfo = healthInfo
  }

  setDefaultValue() {
    this.progress = 0
  }

  updateProgress() {
    this.progress += this.moveInfo.speed.currentSpeed;
    if(this.progress >= 1) {
      this.jump()
      this.progress -= 1
    }
  }

  // 스테미너를 줄인다.
  reduceStemina() {
    this.healthInfo.setSteminaDelta(-1)
  }

  // 소켓에 점프 요청을 보낸다.
  jump() {
    this.socket.emit('jump')
    this.reduceStemina()
  }

  update() {
    this.updateProgress()
  }
}

module.exports = Jump