// TODO: 모든 풀들 중 매치를 만들 조건에 맞는 풀이 있는지 확인한다.

// function
const generateMatch = requie('./generateMatch.js')
const customMath = require('../../../../util/customMath.js')
const checkNotAfk = require('./checkNotAfk.js')

// value
const maximumStandrardDeviation = 50 // 매치가 성사되기 위한 최대한의 표준편차

module.exports = (waitingPool, matchMin) => {
  if(waitingPool.length < matchMin)
    return
  const rankOrderedArray = [... waitingPool].sort((a, b) => a.flag-b.flag) // 낮은 티어부터 오름차순
  const timeOrderedArray = [... waitingPool].sort((a, b) => a.startTime - b.startTime) // 오래 기다린 시간 순서부터 내림차순
  timeOrderedArray.forEach(timeOrderedUser => {
    if(rankOrderedArray.length < 12) // 만약 랭크 배열의 길이가 12이하면 빼버린다.
      break
    const userIndex = pickUserGroups(rankOrderedArray, rankOrderedArray.findIndex(rankOrderedUser => rankOrderedUser === timeOrderedUser))
    if(userIndex) {
      const tempMatch = rankOrderedArray.splice(minIndex, 12) // rankOrderedArray에서 제거함
      tempMatch.forEach(user => { // timeOrderedArray 에 만들어진 유저들을 제거한다.
        timeOrderedArray.splice(rankOrderedArray.findIndex(user), 1) // timeOrderedAray
        checkNotAfk(user, tempMatch)
      })
    }
  })
}

const pickUserGroups = (array, userIndex) => {
  const startIndex = customMath.overZero(userIndex - 12)
  const endIndex = customMath.getMin(array.length-12, userIndex)
  let minIndex = startIndex
  let minValue = 10000000000000
  for(let i = startIndex; i<= endIndex; i++) {
    let standardDeviation = customMath.getStandardDeviation(array.slice(startIndex, startIndex+12))
    if(standardDeviation < minValue) {
      minIndex = i
      minValue = standardDeviation
    }
  }
  if(minValue > maximumStandrardDeviation) // 만약 최소 표준 편차 이상의 표준편차로 구성되었다면 이상한걸 리턴한다.
    return
  return minIndex
}

const test = () => {
  const array = [1,2,3,4,5,6,7,8,9,10,1]
  array.forEach((element, index) => {
    console.log(array.splice(index, 1))
  })
}