const customMath = require('../../util/customMath.js')

const mapList = ['Forest', 'Cementry', 'Desert', 'Swamp', 'Snow Field']

exports.generateMapSequence = () => {
  const mapArray = []
  const copyedMapList = mapList.slice()
  for(let i = 0; i<5; i++) {
    const randomValue = customMath.randomRange(0, copyedMapList.length-1)
    mapArray.push(copyedMapList.splice(randomValue, 1)[0])
  }
  return mapArray
}