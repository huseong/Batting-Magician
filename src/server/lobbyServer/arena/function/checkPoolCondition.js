// TODO: 모든 풀들 중 매치를 만들 조건에 맞는 풀이 있는지 확인한다.

// function
const generateMatch = requie('./generateMatch.js')
const customMath = require('../../../../util/customMath.js')

module.exports = (waitingPool, matchMin) => {
  if(waitingPool.length < matchMin)
    return
  const rankOrderedArray = [... waitingPool].sort((a, b) => a.flag-b.flag) // 낮은 티어부터 오름차순
  const timeOrderedArray = [... waitingPool].sort((a, b) => a.startTime - b.startTime) // 오래 기다린 시간 순서부터 내림차순
  timeOrderedArray.forEach(element => {
    if(rankOrderedArray.length < 12) // 만약 랭크 배열의 길이가 12이하면 빼버린다.
      break
    
  })
}

const pickUserGroups = (array, userIndex) => {
  const startIndex = customMath.overZero(userIndex - 12)
  const endIndex = customMath.getMin(array.length-12, userIndex)
  let avg = customMath.arraySum(array.slice(startIndex, 12))
  let minIndex = startIndex
  for(let i = startIndex + 1; i<= endIndex; i++) {

  }
}