/* TODO: 경마장 각각에 대한 모듈이다.
*/

// module
require('date-utils')
const mongoose = require('mongoose')

// model
const Error = require('../../model/error.model.js')

// inside model
const meta = require('./subModel/meta.subModel.js')
const map = require('./subModel/map.subModel.js')
const users = require('./subModel/users.subModel.js')

const schema = new mongoose.Schema({
  meta : meta.schema,
  info : {
    map : map.schema,
    users : users.schema
  }
})

schema.statics.generateNewArena = (manager, tempMatch) => 
  new Promise((resolve, reject) => {
    tempMatch.gameID = manager.nextMatchID++
    const newArena = new schema({
      meta : meta.create(manager, tempMatch),
      info : {
        map : map.create(),
        users : users.create(tempMatch)
      }
    })
  })

// TODO: Arena 정보를 만들어서 리턴한다.
schema.methods.sendArenaInfo = socket => {
  const param = {
    map : this.map,
    users : users.generateinfoParam(this.users)
  }
  socket.emit('res arena info', param)
}

const arena = mongoose.model('arena', schema)

module.exports = arena