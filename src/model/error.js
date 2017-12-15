// TODO: 발생하는 Error들을 DB에 저장한다

// module
const mongoose = require('mongoose')
require('date-utils')

const schema = new mongoose.Schema({
  name : String,
  date : Date
})

schema.statics.create = name => {
  const date = new Date()
  let newError = new error({
    name : name,
    date : date.toFormat('YYYY-MM-DD HH24:MI:SS')
  })
  newError.save()
}

// TODO: err를 확인하여 있다면 DB에 저장한다.
schema.statics.check = (err, name) =>
  new Promise((resolve, reject) => {
    if(err) {
      error.create(name)
      reject()
    }
    resolve()
  })

const error = mongoose.model('error', schema)

module.exports = error