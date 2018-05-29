class Block {
  constructor(isMoveAble, callback) {
    this.isMoveAble = isMoveAble
    this.callback = callback
  }

  enter(character) {
    if(this.callback) {
      this.callback(character)
    }
  }
}
module.exports = Block