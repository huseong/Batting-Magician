const mongoose = require('mongoose')
require('date-utils')

const schema = new mongoose.Schema({
  date : Date,
  hackName : String,
  userName : String,
  id : String
})

schema.statics.create = (name, userID) => {
  const date = new Date()
  let newHack = new hack({
    hackName : name,
    id : userID ? userID : "Not Auth",
    date : date.toFormat('YYYY-MM-DD HH24:MI:SS')
  })
  console.log('Created Hack : '+ hackName)
  newHack.save(err => {
    if(err)
      console.log('DB Error : ', err)
    })
}

const hack = mongoose.model('hack', schema)

module.exports = hack