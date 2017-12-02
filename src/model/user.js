const mongoose = require('mongoose')
require('date-utils')
const schema = new mongoose.Schema({
    userInfo : {
        id : String,
        name : String,
        money : Number,
        isBanned : Boolean,
        lastEnter : Date
    },
    currentStatus : {
        server: String
    }
})

schema.statics.create = (id, name) => {
    const date = new Date()
    const newUser = new user({
        userInfo : {
            id : id,
            name : name,
            money : 0,
            isBanned : false,
            lastEnter : date.toFormat('YYYY-MM-DD HH24:MI:SS')
        },
        currentStatus : {
            server : 'Lobby'
        }
    })
    newUser.save(err => {
        console.log('User Save Error : ' + err)
    })
    return newUser
}

const user = mongoose.model('user', schema)
module.exports = user