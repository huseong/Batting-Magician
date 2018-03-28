
// TODO: 해당 캐릭터의 회전에 관한 부분을 관리한다.
module.exports = (socket, character) => {
  character.rotate = {
    info : { // 유저 입력으로 바뀌지 않는 부분
      rotateAmount : 0, // 이게 1이 되면 회전을 시도 할 수 있다
      reactSpeed : 0.03 // 0.04초마다의 증감치. (25FPS)
    },
    userInput : { // 유저가 입력해서 바뀌는 부분
      isRotateButtonDown : false,
    }
  }
  socket.on('turn button down', onTurnButtonDown.bind(undefined, socket, rotate))
}

  // // TODO: RotateAmount의 setter이다.
  // const setRotateAmount(value) {
  //   this.rotate.info.rotateAmount = customMath.clampZeroToOne(this.rotate.info.rotateAmount)
  // }

const onTurnButtonDown = (socket, rotate) =>  {
  socket.removeAllListeners('turn button down') // 턴 버튼이 다시 못 눌리게 만든다.
  socket.on('turn button up')
  rotate.userInput.isRotateButtonOn = true // 버튼이 눌린 것을 true로 바꾼다.
}

const changeRotateAmount = rotate => {
  if(rotate.userInput.isRotateButtonDown = false) {

  }
}