class MoveInfo {
  constructor () {
    this.move = { // 이동에 관한 정보
      info : { // 유저 입력으로 바뀌지 않는 부분
        standradSpeed : 0.5, // 이 캐릭터의 원래 속도 (초당 점프 속도)
        currentSpeed : 1.2, // 이 캐릭터의 현재 속도
        acceleration : 0.1, // 이 캐릭터의 초당 가속도
      },
      userInput : { 
        deltaSpeed : 0, // 속도의 변화량. -1~1의 값을 갖는다.
      }
      // location : {
      //   x : 0, y : 0
      // } // 이 캐릭터의 현 위치
    }
  }
}
