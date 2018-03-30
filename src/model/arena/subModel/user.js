// module
const mongoose = require('mongoose')

exports.schema = new mongoose.Schema({
  meta : {
    id : String,
    name : String,
    epithet : String,
    profile : String
  },
  
})

exports.create = user => new exports.schema({
  
})