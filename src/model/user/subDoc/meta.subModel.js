const mongoose = require('mongoose')

const metaSchema = new mongoose.Schema({
  id : String, // 유저의 식별자. Google ID이다.
  name : String, // 유저의 이름
  isBanned : Boolean, // 유저가 밴이 됬는지
  lastEnter : Date, // 유저가 마지막으로 접속한 날짜
  profile : String, // 유저가 현재 설정한 프로필
  isActive : Boolean, // 유저가 지금 활성화 상태(온라인)인지
  status : String // 유저의 현 상태
})

metaSchema.create = (id, name) => {
  return {
    id : id,
    name : name,
    isBanned : false,
    lastEnter : (new Date()).toFormat('YYYY-MM-DD HH24:MI:SS'),
    profile : 'The Light Of Dimigo',
    isActive : true,
    status : 'Front'
  }
}

metaSchema.sendData = (socket, user) =>
  new Promise(resolve => {
    socket.emit('update user name', { name : user.meta.name })
    socket.emit('update user profile', { profile : user.meta.profile })
    resolve()
  })

metaSchema.setName = (socket, user, name) =>
  new Promise(resolve => {
    user.meta.name = name
    user.save(err => {
      socket.emit('update user name', { name : user.meta.name })
      resolve()
    })
  })

metaSchema.setProfile = (socket, user, profile) =>
  new Promise(resolve => {
    user.meta.profile = profile
    user.save(err => {
      socket.emit('update user profile', { profile : user.meta.profile })
      resolve()
    })
  })

module.exports = metaSchema
