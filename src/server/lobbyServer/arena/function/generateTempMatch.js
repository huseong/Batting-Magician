// TODO: 모든 풀들 중 매치를 만들 조건에 맞는 풀이 있는지 확인한다.

// function
const generateMatch = requie('./generateMatch.js')
const customMath = require('../../../../util/customMath.js')
const checkNotAfk = require('./checkNotAfk.js')

// value
const maximumStandrardDeviation = 50 // 매치가 성사되기 위한 최대한의 표준편차

module.exports = (manager, matchMin) => {
  const waitingPool = manager.waitingPool
  if(waitingPool.length < matchMin)
    return
  waitingPool.forEach(user => user.availCancel = false)
  const rankOrderedArray = [... waitingPool].sort((a, b) => a.flag-b.flag) // 낮은 티어부터 오름차순
  const timeOrderedArray = [... waitingPool].sort((a, b) => a.startTime - b.startTime) // 오래 기다린 시간 순서부터 내림차순
  timeOrderedArray.forEach(timeOrderedUser => {
    if(rankOrderedArray.length < 12) // 만약 랭크 배열의 길이가 12이하면 빼버린다.
      break
    const tempMatch = pickUserGroups(rankOrderedArray, rankOrderedArray.indexOf(timeOrderedUser))
    if(tempMatch) {
      tempMatch.forEach(user => { 
        timeOrderedArray.splice(rankOrderedArray.indexOf(user), 1) // timeOrderedArray 에 만들어진 유저들을 제거한다.
        checkNotAfk(user, tempMatch, manager) // user가 Afk상태인지 확인한다.
      })
    }
  })
  waitingPool = rankOrderedArray
}

// TODO: 해당 유저를 포함하는 유저 그룹 중 가장 합리적인 그룹을 찾는다.
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
  return array.splice(minIndex, 12)
}