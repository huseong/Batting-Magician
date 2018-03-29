// module
const mongoose = require('mongoose')

// TODO: 매치의 메타 정보
exports.schema = new mongoose.Schema({
  id : Number, // 해당 아레나에 대한 고유 식별자이다.
  server : String, // 이 아레나가 속한 서버의 이름
  date : Date, // 매치 진행 날짜
  users : Array // 유저들의 순수 아이디가 들어간다.
})

exports.create = (manager, tempMatch) =>
  new metaSchema({
    id : manager.nextMatchID++,
    server : manager.serverName.id,
    date : (new Date()).toFormat('YYYY-MM-DD HH24:MI:SS'),
    users : tempMatch.map(matchUser => matchUser.user.meta.id)
  })

