// module
const mongoose = require('mongoose')

const metaSchema = new mongoose.Schema({
  id : Number, // 해당 아레나에 대한 고유 식별자이다.
  server : String, // 이 아레나가 속한 서버의 이름
  date : Date, // 매치 진행 날짜
})

// TODO: 매치의 메타 정보
exports.schema = metaSchema 

exports.create = (manager, tempMatch) =>
  new metaSchema({
    id : tempMatch.id,
    server : manager.serverName,
    date : (new Date()).toFormat('YYYY-MM-DD HH24:MI:SS'),
  })

