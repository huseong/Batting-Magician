// TODO: user 객체를 인자로 받아서 팀을 찾아준다.
//       또한 팀의 정보를 보내준다.
// parameter : arena - 아레나 객체 
//             socket - Room에 Join 시켜야할 소켓
//             user - 유저 객체
// return : 팀의 이름을 String으로 return한다.
module.exports = (arena, socket, user) => {
  const usersModel = arena.arenaModel.info.users
  const users = arena.users
  const id = user.meta.id
  const teamName = usersModel.red.includes(id) ? 'red' : usersModel.blue.includes(id) ? 'blue' : usersModel.green.includes(id) ? 'green' : 'yellow'
  socket.join(arena.id + teamName) // socket이 팀에 들어갈 수 있게 할당한다.
  if(users[teamName]) { // 만약 users의 teamName이 undefined면 즉 아직 팀이 만들어지지 않았다면
    users[teamName] = [] // arena.users의 속성으로 teamName에 해당하는 배열을 만든다 
  }
  users[teamName].push(user) // arena.users 에 user을 넣고
  user.meta.teamName = teamName // user의 teamName에 찾은 teamName을 할당한다.
}