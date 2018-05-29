class Accel {
  constructor(socket, moveInfo) {
    this.setMetaValue(socket, moveInfo)
    this.setDefaultValue()
    this.setSocketListener(socket)
  }

  setMetaValue(socket, moveInfo) {
    this.socket = socket
    this.moveInfo = moveInfo
  }

  setDefaultValue() {
    this.deltaSpeed = 0 // 속도의 변화량. -1~1의 값을 갖는다.
    this.maxAccleration = 0.0015
  }

  setSocketListener(socket) {
    socket.on('set accel', ({value}) => {
      this.deltaSpeed = value * 0.2
    })
  }

  // DeltaSpeed에 따라 가속 또는 감속을 한다.
  accel() {
    if(!(this.deltaSpeed == 0)) {
      this.moveInfo.speed.setSpeedDelta(this.deltaSpeed * this.maxAccleration)
    }
  }

  update() {
    this.accel()
  }
}

module.exports = Accel