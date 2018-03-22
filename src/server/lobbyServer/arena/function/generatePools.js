// TODO: 풀을 생성한다.

module.exports = () => {
  const pools = []
  for(let i=0; i<12; i++) {
    const tierPool = {
      users : [],
      matchMakingFront : true, // 매치 메이킹을 앞부터 할지 뒤 부터 할지 결정하는 요소이다.
      matchMakeFailCount : 0 // 매치 메이킹을 실패한 횟수
    }
    pools.push(tierPool)
  }
  return pools
}