/* TODO: 경마장 각각에 대한 모듈이다.
*/
require('date-utils')

const mongoose = require('mongoose')
const Error = require('./error.js')

const schema = new mongoose.Schema({
  meta : {
    id : Number, // 해당 방에 대한 고유 식별자이다.
    serverName : String,
    date : Date,
    name : String,
    type : String
  },
  info : {
    users : [String],
    status : String,
    horses : [Number]
  }
})

schema.methods.toUserInfo = function() {
  let param = {
    userCount : this.info.users.length,
    status : this.info.users.status,
    horses : this.info.users.horses
  }
  return param
}

schema.statics.create = (server, type, users) =>
  new Promise((resolve, reject) => {
    let newMatch = new room({
      meta : {
        id : server.getRoomID,
        serverName : server.info.name,
        date : (new Date()).toFormat('YYYY-MM-DD HH24:MI:SS'),
        name : '후성배 경마 경주',
        type : type
      },
      info : {
        users : users.map(user => user.id),
        status : 'Wait',
        slime : []
      }
    })
    newMatch.save(err => {
      Error.create('Match DB Error')
      reject()
    })
    return resolve(newMatch)
  })

const match = mongoose.model('room', schema)

module.exports = match