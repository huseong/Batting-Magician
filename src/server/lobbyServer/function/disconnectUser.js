module.exports = socket =>
  new Promise((resolve, reject) => {
    if(socket.user) {
      socket.user.meta.status = 'Enter'
      socket.user.save()
    }
    console.log('user Disconnected in Lobby Server : ', socket.id)
  })