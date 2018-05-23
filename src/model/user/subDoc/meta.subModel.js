const mongoose = require('mongoose')

const metaSchema = new mongoose.Schema({
  id : String, // 유저의 식별자. Google ID이다.
  name : String, // 유저의 이름
  isBanned : Boolean, // 유저가 밴이 됬는지
  lastEnter : Date, // 유저가 마지막으로 접속한 날짜
  profile : String, // 유저가 현재 설정한 프로필
})

metaSchema.create = (id, name) => {
  return {
    id : id,
    name : name,
    isBanned : false,
    lastEnter : (new Date()).toFormat('YYYY-MM-DD HH24:MI:SS'),
    profile : 'The Light Of Dimigo'
  }
}

module.exports = metaSchema
