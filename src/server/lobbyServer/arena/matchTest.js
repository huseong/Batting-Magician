const CSVParser = require('../../../util/CSVParser.js')
const pickUserGroups = require('./function/pickUserGroups.js').main
const updateMaximum = require('./function/pickUserGroups.js').updateMaximum

const objectiveUser = data =>
  new Promise(resolve => {
    console.log('가상 데이터 로딩 완료... 소요 시간 : ' + ((Date.now() - startTime)/1000) + '초\n')
    console.log('가상 데이터 사용자 수 : ' + data.length)
    console.log('사용자 구조화 중...')
    startTime = Date.now()
    const users = []
    data.forEach(line => {
      users.push({
        flag : Number(line[0]),
        time : Number(line[1]),
        id : Number(line[2])
      })
      // console.log('사용자 ID : ' + line[2] + ' 플래그 : ' + line[0] + ' 대기 시간 : ' + line[1])
    })
    resolve(users)
  })


console.log('매치 기능 테스트 실행...\n')
console.log('가상 데이터 불러오는 중...\n')
let startTime = Date.now()
CSVParser.getTwoDimensionalArray('./temp.CSV')
.then(objectiveUser)
.then(users => {
  console.log(users.length + '명의 사용자 구조화 완료. 소요 시간 : ' + ((Date.now() - startTime)/1000) + '초\n')
  console.log('이제 3초 간격으로 매치를 만들기 시작합니다...')
  setInterval(() => {
    console.log('\n사용자 정렬 중...')
    startTime = Date.now()
    const rankOrderedArray = [... users].sort((a, b) => a.flag-b.flag) // 낮은 티어부터 오름차순
    const timeOrderedArray = [... users].sort((a, b) => a.time - b.time) // 오래 기다린 시간 순서부터 내림차순
    console.log(users.length + '명의 사용자 정렬 완료. 소요 시간 : ' + ((Date.now() - startTime)/1000) + '초')
    let matchCount = 0
    timeOrderedArray.forEach(timeOrderedUser => {
      // if(rankOrderedArray.length < 12) // 만약 랭크 배열의 길이가 12이하면 빼버린다.
      //   throw
      const tempMatch = pickUserGroups(rankOrderedArray, rankOrderedArray.indexOf(timeOrderedUser))
      if(tempMatch) {
        let answer = ''
        tempMatch.forEach(user => { 
          timeOrderedArray.splice(rankOrderedArray.indexOf(user), 1) // timeOrderedArray 에 만들어진 유저들을 제거한다.
          // answer += '사용자 ID : ' + user.id + ' 플래그 : ' + user.flag + ' 대기 시간 : ' + user.time + '\n'
        })
        // console.log('\n' + answer)
        ++matchCount
      }
    })
    if(matchCount < timeOrderedArray.length / 20)
      updateMaximum()
    users = [... timeOrderedArray]
    console.log('이번 매칭에서 총 ' + matchCount + '개의 매치가 만들어졌습니다.')
    console.log('이제 매칭 풀에 남아있는 사용자의 수는 총 ' + users.length + '명 입니다.')
  }, 3000)
})

