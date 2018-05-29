// module
const mongoose = require('mongoose')

const wealthSchema = new mongoose.Schema({
  money : Number,
  jam : Number,
  profile : [String] // 보유한 프로필의 목록
})

wealthSchema.create = () => {
  return {
    money : 1000,
    jam : 0,
    profile : ['The Light of Dimigo'] // 기본으로 디미고 프로필을 넣어놓는다.
  }
}

wealthSchema.sendData = (socket, user) =>
  new Promise(resolve => {
    socket.emit('update money', { money : user.wealth.money })
    socket.emit('update jam', { jam : user.wealth.jam })
    resolve()
  })

wealthSchema.setMoney = (socket, user, money) =>
  new Promise(resolve => {
    user.wealth.money = money
    user.save(err => {
      socket.emit('update money', { money : money })
      resolve()
    })
  })

wealthSchema.setJam = (socket, user, jam) =>
  new Promise(resolve => {
    user.wealth.jam = jam
    user.save(err => {
      socket.emit('update jam', { jam : jam })
    })
  })

module.exports = wealthSchema