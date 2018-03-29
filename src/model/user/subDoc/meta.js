const mongoose = require('mongoose')

exports.schema = new mongoose.Schema({
  id : String, // 유저의 식별자. Google ID이다.
  name : String, // 유저의 이름
  epithet : String, // 형용어의 이름
  isBanned : Boolean, // 유저가 밴이 됬는지
  lastEnter : Date, // 유저가 마지막으로 접속한 날짜
  profile : String, // 유저가 가진 프로필
})

exports.create = (id, name) =>
  new exports.schema({
    id : id,
    name : name,
    epithet : 0,
    isBanned : false,
    lastEnter : (new Date()).toFormat('YYYY-MM-DD HH24:MI:SS'),
    profile : 'Dog'
  })
