const mongoose  = require('mongoose')
require('date-utils')

const schema = new mongoose.Schema({
  date : Date,
  hackName : String,
  userName : String,
  id : String
})

schema.statics.create = (hackName, userName, id) => {
  const date = new Date()
  let hack = new hack({
    hackName : hackName,
    userName : userName,
    id : id,
    date : date.toFormat('YYYY-MM-DD HH24:MI:SS')
  })
  hack.save(err => { console.log('DB Error : ', err) })
}

const hack = mongoose.model('hack', schema)

module.exports = hack