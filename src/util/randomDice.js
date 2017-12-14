// TODO: 주사위 굴린 값을 반환한다.

module.exports = (weights, sum) => {
  let randomValue = Math.floor(Math.random() * sum) + 1
  for(let i = 0; i<weights.length; i++) {
    randomValue -= weights[i]
    if(randomValue <= 0)
      return i
  }
}