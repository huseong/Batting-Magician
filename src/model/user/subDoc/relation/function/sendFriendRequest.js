// TODO: 친구 요청을 보낸다.

module.exports = (socket, user, requestedUserName) =>
  new Promise(resolve => {
    if(user.relation.friend.length === 200)
      return socket.emit('res user has maximum friend')
    User.findOne({'meta.name' : requestedUserName }, (err, requestedUser) => {
      if(!requestedUser)
        return socket.emit('res user not found') // 유저를 찾을 수 없다고 보냄.
      if(requestedUser.relation.block.indexOf(user.meta.name) === -1) // 만약 플레이어가 해당 유저의 차단 목록에 있다면 그냥 끊어버린다.
        return
      const request = {
        name : user.meta.name,
        sendTime : (new Date()).toFormat('YYYY-MM-DD HH24:MI:SS')
      }
      user.relation.myRequestList.push(request)
      requestedUser.relation.otherUserRequestList.push(request)
      user.save()
      requestedUser.save()
  })
})