// TODO: 아레나에 있는 모든 유저들을 모아 하나의 배열로 만든다.
module.exports = arena =>
  [].concat(arena.users['red']).concat(arena.users['blue']).concat(arena.users['green']).concat(arena.users['yellow'])