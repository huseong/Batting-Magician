// module
const mongoose = require('mongoose')

// subDoc
const User = require('./user.subModel.js')

// util
const popRandomArrayValue = require('../../../util/customMath.js').popRandomArrayValue

const schema = new mongoose.Schema({
  red : [User],
  blue : [User],
  green : [User],
  yellow : [User]
})

schema.create = async (tempMatch) => {
    const lowIndex = [... new Array(4)].map((value, index) => index)
    const middleIndex = [... new Array(4)].map((value, index) => index+4)
    const highIndex = [... new Array(4)].map((value, index) => index+8)
    const getRandomArray = () => {
      return [popRandomArrayValue(lowIndex), popRandomArrayValue(middleIndex), popRandomArrayValue(highIndex)]
    }
    const users = new schema({
      red : await generateTeam(getRandomArray(), tempMatch, 'red'),
      blue : await generateTeam(getRandomArray(), tempMatch, 'blue'),
      green : await generateTeam(getRandomArray(), tempMatch, 'green'),
      yellow : await generateTeam(getRandomArray(), tempMatch, 'yellow')
    })
    return users
  }

// TODO: 입력받은 배열로 팀을 만든다.
const generateTeam = (indexArr, tempMatch, teamColor) => 
  new Promise(resolve => {
    let userGeneratedCount = 0
    indexArr.map((userIndex, elementIndex) =>  {
      User.create(tempMatch[userIndex].user, elementIndex)
      .then(() => {
        if(++userGeneratedCount === 3) {
          resolve()
        } 
      })
    })
  })

const generateinfoParam = users => {
  return {
    red : users.red.map(user => User.generateInfo(user)),
    blue : users.blue.map(user => User.generateInfo(user)),
    green : users.green.map(user => User.generateInfo(user)),
    yellow : users.yellow.map(user => User.generateInfo(user))
  }
}

module.exports = schema