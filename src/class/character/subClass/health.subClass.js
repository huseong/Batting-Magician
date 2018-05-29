const customMath = require('../../../util/customMath')

class Health {
  constructor(socket) {
    this.socket = socket
    this.hp = {}
    this.sp = {}
    this.setMaxHealth(120)
    this.setHealth(120)
    this.setMaxStemina(120)
    this.setStemina(120)
  }

  setMaxHealth(value) {
    this.hp.max = value
    this.socket.emit('update max hp', { value : value })
  }

  setHealth(value) {
    this.hp.current = customMath.clamp(value, 0, this.hp.max)
    this.socket.emit('update hp', {value : this.hp.current})
  }

  setMaxStemina(value) {
    this.sp.max = value
    this.socket.emit('update max sp', { value : value })
  }

  setStemina(value) {
    this.sp.current = customMath.clamp(value, 0, this.hp.max)
    this.socket.emit('update sp', { value : this.sp.current })
  }

  setSteminaDelta(delta) {
    this.setStemina(this.sp.current + delta)
  }
}

module.exports = Health