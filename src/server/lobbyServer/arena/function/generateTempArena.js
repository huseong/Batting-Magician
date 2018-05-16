// TODO: 모든 풀들 중 매치를 만들 조건에 맞는 풀이 있는지 확인한다.

// function
const generateMatch = requie('./generateMatch.js')
const customMath = require('../../../../util/customMath.js')
const checkNotAfk = require('./checkNotAfk.js')
const cancelMatch = require('./cancelMatch.js')

module.exports = manager => {
  const waitingPool = manager.waitingPool
  const matchMin = manager.matchMin
  if(waitingPool.length < matchMin)
    return
  waitingPool.forEach(user => user.availCancel = false)
  const rankOrderedArray = [... waitingPool].sort((a, b) => a.flag-b.flag) // 낮은 티어부터 오름차순
  const timeOrderedArray = [... waitingPool].sort((a, b) => a.startTime - b.startTime) // 오래 기다린 시간 순서부터 내림차순
  timeOrderedArray.forEach(timeOrderedUser => {
    if(rankOrderedArray.length < 12) // 만약 랭크 배열의 길이가 12이하면 빼버린다.
      break
    const tempMatch = pickUserGroups(rankOrderedArray, rankOrderedArray.indexOf(timeOrderedUser))
    if(tempMatch) { // 임시 매치가 만들어졌다면
      tempMatch.forEach(user => {
        timeOrderedArray.splice(rankOrderedArray.indexOf(user), 1) // timeOrderedArray 에 만들어진 유저들을 제거한다.
      })
      checkNotAfk(tempMatch)
    }
  })
  waitingPool = [... rankOrderedArray]
}

const checkMatchStarted = (tempMatch, manager) => {
  if(!tempMatch.isStart)
    cancelMatch(tempMatch, manager)
}