// module
const mongoose = require('mongoose')

// function
const customMath = require('../../util/customMath.js')

// TODO: 해당 매치의 맵을 담는 스키마
exports.schema = new mongoose.Schema({
  sequence : Array,
  detail : String,
  log : String
})

exports.create = () => 
  new mapSchema({
    sequence : generateMapSequence()
  })

const generateMapSequence = () => {
  const mapArray = []
  const mapList = ['Forest', 'Cementry', 'Desert', 'Swamp', 'Paradox']
  for(let i = 0; i<5; i++) {
    const randomValue = customMath.randomRange(0, mapList.length-1)
    mapArray.push(mapList.splice(randomValue, 1)[0])
  }
  return mapArray
}