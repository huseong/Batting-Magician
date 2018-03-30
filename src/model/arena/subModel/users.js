// module
const mongoose = require('mongoose')

// subDoc
const User = require('./user.js')

const redIndex = [0, 4, 11]
const blueIndex = [1, 5, 10]
const greenIndex = [2, 6, 9]
const yellowIndex = [3, 7, 8]

exports.schema = new mongoose.Schema({
  red : [User.schema],
  blue : [User.schema],
  green : [User.schema],
  yellow : [User.schema]
})

exports.create = tempMatch =>
  new exports.schema({
    red : generateTeam(redIndex, tempMatch),
    blue : generateTeam(blueIndex, tempMatch),
    green : generateTeam(greenIndex, tempMatch),
    yellow : generateTeam(yellowIndex, tempMatch)
  })

const generateTeam = (indexArr, tempMatch) =>
  indexArr.map((userIndex, elementIndex) => setUserInTeam(tempMatch[userIndex].user, elementIndex))

const setUserInTeam = user => {
  user.info.arena.gameID = tempMatch.gameID
  user.info.arena.isGamePlaying = true
  user.info.status = 'Arena'
  user.save()
  User.create(user)
}