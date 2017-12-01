const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    userInfo : {
        id : String,
        name : String,
        money : Number
    },
    currentStatus : {
        room: Number
    }
})

schema.statics.create = (id, name) => {
    const newUser = new user({
        userInfo : {
            id : id,
            name : name,
            money : 0
        },
        currentStatus : {
            room : 0
        }
    })
    newUser.save(err => {
        console.log('User Save Error : ' + err)
    })
}

const user = mongoose.model('user', schema)
module.exports = user