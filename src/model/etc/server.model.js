/* TODO: 
현재 이 서버의 상태를 보여준다.
*/

const mongoose = require('mongoose')
const Error = require('./error.model.js')
const schema = new mongoose.Schema({
  info : {
    serverName : String,
    nextArenaID : Number
  }
})

// TODO: 아레나 아이디를 요청한다.
schema.methods.getNextID = function() {
    let id = this.info.nextArenaID++
    this.save(err => Error.create('Server Save Error'))
    return id
}

const server = mongoose.model('server', schema)

module.exports = server