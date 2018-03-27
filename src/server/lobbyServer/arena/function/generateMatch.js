// model
const User = require('../../../../model/user.js')

module.exports = tempMatch => {
  tempMatch.forEach(matchUser => {
    User.checkStatus(matchUser.socket, 'Lobby')
    .then(user => {

    })
  });
}

const checkAllUserStatus = tempMatch