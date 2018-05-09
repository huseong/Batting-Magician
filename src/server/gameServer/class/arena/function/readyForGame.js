//
const getAllUsers = require('./getAllUsers.js')

// const
const defaultPreparationTime = 80 // 기본적인 대기 시간


module.exports = arena => {
  arena.time = defaultPreparationTime // 아레나의 시간을 기본 준비 시간으로 맞춘다.
  setInterval(() => { arena.time-- }, 1000)
  
}

const countDown = arena => {
  arena.time--
  if(arena.time <= 0) {
    
    return
  }
  setTimeout(() => countDown(arena), 1000)
}