/* TODO: 
현재 이 서버의 상태를 보여준다.
*/

const mongoose = require('mongoose')
const Error = require('./error.js')
const schema = new mongoose.Schema({
    info : {
        serverName : String,
        currentRoomID : Number
    }
})

schema.methods.getRoomID = function() {
    let id = this.info.currentRoomID++
    this.save(err => Error.create('Server Save Error'))
    return id
}

const server = mongoose.model('server', schema)

module.exports = server