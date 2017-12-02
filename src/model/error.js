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

const error = mongoose.model('error', schema)

module.exports = error