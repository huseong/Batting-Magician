// TODO: 주어진 수를 받아 0이하면 0을, 아니면 그 수를 반환한다.
const overZero = number => {
  if(number < 0)
    return 0
  return number
}

// TODO: 두 수 중 더 작은 것을 반환한다.
const getMin = (a, b) => {
  return a > b ? b : a
}

// TODO: 해당 배열의 값들의 합을 반환한다.
const arraySum = array => {
  return array.reduce((previousValue, currentValue) => previousValue + currentValue)
}

// TODO: 해당 배열의 값들의 평균을 반환한다.
const getAvg = array => {
  let sum = arraySum(array)
  return sum / array.length
}

// 해당 배열의 값들의 분산을 반환한다.
const getVariance = array => {
  let avg = getAvg(array)
  return array.reduce((previousValue, currentValue) => previousValue + Math.pow(currentValue - avg, 2))
}

const getStandardDeviation = array => Math.sqrt(getVariance(array))

exports.arraySum = arraySum
exports.getAvg = getAvg
exports.getMin = getMin
exports.overZero = overZero
exports.getVariance = getVariance
exports.getStandardDeviation = getStandardDeviation