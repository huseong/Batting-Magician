const mongoose  = require('mongoose')

const schema = new mongoose.Schema({
  date : { type : Date, default : Date.now },
  hackName : String,
  userName : String,
  id : String
})

schema.statics.create = (hackName, userName, id) => {
  let hack = new hack({
    hackName : hackName,
    userName : userName,
    id : id
  })
  hack.save(err => { console.log('DB Error : ', err) })
}

const hack = mongoose.model('hack', schema)

module.exports = hack