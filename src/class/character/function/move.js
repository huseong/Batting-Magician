module.exports = (socket, character) => {
  character.move = {
    info : { // 유저 입력으로 바뀌지 않는 부분
      standradSpeed : 0.6, // 이 캐릭터의 원래 속도 (초당 점프 속도)
      currentSpeed : 1.2, // 이 캐릭터의 현재 속도
      acceleration : 0.1, // 이 캐릭터의 가속도 (초당 변화량)
    },
    userInput : { 
      deltaSpeed : 0, // 유저가 원하는 속도 변화(1~-1의 값을 갖는다.)
    }
  }
  socket.on('change delta speed') // 속도 변화 요청
}

