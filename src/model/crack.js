const mongoose = require('mongoose')
require('date-utils')

const schema = new mongoose.Schema({
  date : Date,
  crackName : String,
  userName : String,
  id : String
})

// TODO: Crack을 만들고 저장한다. 또한 Disconnect Message를 위해 메세지를 리턴해준다.
schema.statics.create = (crackName, userID) => {
  const date = new Date()
  let newCrack = new crack({
    hackName : name,
    id : userID ? userID : "Not Auth",
    date : date.toFormat('YYYY-MM-DD HH24:MI:SS')
  })
  console.log('Created Crack : '+ crackName)
  newHack.save(err => {
    if(err)
      console.log('DB Error : ', err)
    })
  return 'Crack Detected'
}

const crack = mongoose.model('crack', schema)

module.exports = crack