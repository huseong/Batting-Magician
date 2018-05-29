const User = require('../../../user.model.js')

module.exports = (socket, user) =>
  new Promise(async resolve => {
    socket.emit('update friends', { friends : await sortFriends(user.relation.friends) })
    socket.emit('update my requests', { requests : user.relation.requests })
    socket.emit('update other requests', { requests : user.relation.otherRequests })
    resolve()
})

const sortFriends = async friends =>
  new Promise(async resolve => {
    const activeArray = []
    const inActiveArray = []
    for(const friend of friends) {
      const friendData = await loadFriendData(friend)
      friendData.isActive ? activeArray.push(friendData) : inActiveArray.push(friendData) 
    }
    activeArray.sort((a, b) => b.chat[b.chat.length - 1].time - a.chat[a.chat.length - 1].time) // b가 먼져 보냈으면 b가 앞에
    inActiveArray.sort((a, b) => b.lastEnter - a.lastEnter)
    return resolve(activeArray.concat(inActiveArray))
  })

// 친구 데이터를 불러온다.
const loadFriendData = friend =>
  new Promise(resolve => {
    User.findOne({'meta.id' : friend.id }, user => {
      return resolve({
        profile : user.meta.profile,
        name : user.meta.name,
        chat : friend.chat,
        isActive : user.meta.isActive,
        lastEnter : user.meta.lastEnter,
        flag : user.arena.flag
      })
    })
  })