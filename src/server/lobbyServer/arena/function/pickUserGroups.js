// TODO: 해당 유저를 포함하는 유저 그룹 중 가장 합리적인 그룹을 찾는다.

// const
let maximumStandrardDeviation = 30 // 매치가 성사되기 위한 최대한의 표준편차

// util
const customMath = require('../../../../util/customMath.js')

exports.main = (array, userIndex) => {
  const startIndex = customMath.overZero(userIndex - 12) // 탐색을 시작할 Index를 정한다. 0 이상인지 확인한다.
  const endIndex = customMath.getMin(array.length-12, userIndex) // 탐색을 끝낼 Index를 정한다. 유저 그룹의 길이 이상인지 확인한다.
  let minIndex = startIndex
  let minValue = 10000000000000
  for(let i = startIndex; i<= endIndex; i++) {
    const standardDeviation = customMath.getStandardDeviation(array.slice(startIndex, startIndex+12).map(user => user.flag)) // 해당 배열에서의 표준 편차를 구한다.
    if(standardDeviation < minValue) {
      minIndex = i
      minValue = standardDeviation
    }
  }
  if(minValue > maximumStandrardDeviation) // 만약 최소 표준 편차 이상의 표준편차로 구성되었다면 undefined를 리턴한다.
    return undefined
  // console.log('이번에 만들어진 매치의 표준 편차는 ' + minValue + '입니다.')
  return array.splice(minIndex, 12)
}

exports.updateMaximum = () => {
  maximumStandrardDeviation += 6
  console.log('합리적인 매칭을 위해 최대한의 표준 편차를 증가시킵니다.\n현재 표준 편차 : ' + maximumStandrardDeviation)
}