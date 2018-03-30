/* TODO: 경마장 각각에 대한 모듈이다.
*/

// module
require('date-utils')
const mongoose = require('mongoose')

// model
const Error = require('./error.js')

// inside model
const meta = require('./arena/meta.js')
const map = require('./arena/map.js')
const users = require('./arena/users.js')

const schema = new mongoose.Schema({
  meta : meta.schema,
  info : {
    map : map.schema,
    users : users.schema
  }
})

schema.statics.generateNewArena = (manager, tempMatch) => 
  new Promise((resolve, reject) => {
    const newArena = new schema({
      meta : meta.create(manager, tempMatch),
      info : {
        map : map.create(),
        users : users.create(tempMatch)
      }
    })
  })

const room = mongoose.model('arena', schema)

module.exports = room