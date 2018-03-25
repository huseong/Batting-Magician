  // TODO: 모든 풀들 중 매치를 만들 조건에 맞는 풀이 있는지 확인한다.

// function
const generateMatch = requie('./generateMatch.js')



module.exports = (waitingPools, matchMin) => {
  for(let index=0; index<waitingPools.length; index++) {
    const pool = waitingPools[i]
    if(pool.length < matchMin) { // 만약 12명 미만이면 못 만든다.
      pool.failCount++ // 실패한 횟수에 1을 더한다.
      if(pool.failCount > 8) { // 만약 8번 이상 실패했다면
        if(index > 0) {
          
        }
      }
    }
    generateMatch(pool)
  }
}