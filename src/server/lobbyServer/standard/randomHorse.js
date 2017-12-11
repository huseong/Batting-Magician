// TODO: 무작위로 말을 만든다.

module.exports = type => {
  let a = 0
  switch(type) {
    case 'Standard' :
    return generateRandomArray([...Array(10)].map(n => a++))
    case 'Small' :
  }
}

const generateRandomArray = (arr) => {
  let returnValue = []
  let arrLength = arr.length
  for(let i = 0; i<arrLength; i++) {
    let index = Math.floor(Math.random() * (arr.length))
    returnValue.push(arr[index])
    arr.splice(index, 1)
  }
  return returnValue
}