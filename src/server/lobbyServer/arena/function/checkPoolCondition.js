  // TODO: 모든 풀들 중 매치를 만들 조건에 맞는 풀이 있는지 확인한다.

// function
const generateMatch = requie('./generateMatch.js')



module.exports = (waitingPools, matchMin) => {
  waitingPools.forEach(pool => {
    if(pool.length < matchMin) {
      waitingPool[i].poolFailCount++ // 실패한 횟수에 1을 더한다.
      if(waitingPool[i].poolFailCount > 6) { // 만약 6번 이상 실패했다면

      }
    }
  });
  for(let i=0; i<waitingPools.length; i++) {
    if(waitingPool[i].length < matchMin) {


    }
    generateMatch(waitingPool[i])
  }
}