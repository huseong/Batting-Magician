// module
const mongoose = require('mongoose')

// subDoc
const User = require('./user.subModel.js')

// util
const popRandomArrayValue = require('../../../util/customMath.js').popRandomArrayValue

exports.schema = new mongoose.Schema({
  red : [User.schema],
  blue : [User.schema],
  green : [User.schema],
  yellow : [User.schema]
})

exports.create = tempMatch => {
  const lowIndex = [... new Array(4)].map((value, index) => index)
  const middleIndex = [... new Array(4)].map((value, index) => index+4)
  const highIndex = [... new Array(4)].map((value, index) => index+8)
  const getRandomArray = () => {
    return [popRandomArrayValue(lowIndex), popRandomArrayValue(middleIndex), popRandomArrayValue(highIndex)]
  }

  new exports.schema({
    red : generateTeam(getRandomArray(), tempMatch, 'red'),
    blue : generateTeam(getRandomArray(), tempMatch, 'blue'),
    green : generateTeam(getRandomArray(), tempMatch, 'green'),
    yellow : generateTeam(getRandomArray(), tempMatch, 'yellow')
  })
}

const generateTeam = (indexArr, tempMatch, team) =>
  indexArr.map((userIndex, elementIndex) => setUserInTeam(tempMatch[userIndex].user, elementIndex, team))

const setUserInTeam = (user, elementIndex, team) => {
  user.info.arena.gameID = tempMatch.gameID
  user.info.arena.isGamePlaying = true
  user.info.status = 'Arena'
  user.save()
  return User.create(user, elementIndex, team)
}

exports.generateinfoParam = users => {
  return {
    red : users.red.map(user => User.generateInfo(user)),
    blue : users.blue.map(user => User.generateInfo(user)),
    green : users.green.map(user => User.generateInfo(user)),
    yellow : users.yellow.map(user => User.generateInfo(user))
  }
}