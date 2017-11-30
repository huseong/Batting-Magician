const HackSchema = require('../../customModules/mongooseSchema').HackSchema
const Promise = require('Promise')

exports.startServer = function (io, socket) {
    return new Promise((resolve) => {
        versionCheck(socket)
        .then(ownershipCheck)
        .then(enterServer)
        .then(resolve)
    })
}

/*TODO:
클라이언트의 버전을 확인한다.
만약 문제가 없다면 다음으로 넘어간다.
*/
versionCheck = function (socket) {
    socket.isVersionCheck = false
    return new Promise ((resolve) => {
        socket.emit('Version Check Req') // 클라이언트로 버전 요청을 보낸다.
        const serverVersion = '0.0.1.0' // 현재 서버의 버전 값이다.
        setTimeout(()=> { // 1초 안에 클라이언트에서 답장이 안오면 연결을 끝낸다. 
            if(!socket.isVersionCheck) { 
                return socket.disconnect(true)
            }
        }, 1000)
        socket.on('Version Check Res', (param) => { // 버전 요청에 온 응답
            socket.removeAllListeners('Version Check Res') // 버전 요청 받는 리스너를 닫는다.
            if(param.version === serverVersion) { // 응답이 같다면
                socket.isVersionCheck = true
                socket.emit('Version Correct')
                return resolve(socket) // socket을 넘겨주고 턴 엔드.
            } else { // 만약 버전이 다르다면
                let param
                param.version = serverVersion
                socket.emit('Version Upgrade', serverVersion) // 클라이언트로 버전 요청을 보낸다.
                return socket.disconnect(true) // 버전 요청을 보낸뒤 연결을 끝낸다.
            }
        })
    })
}

/*TODO:
클라이언트가 정품인지 확인한다.
*/
exports.ownershipCheck = (socket) => {
    return new Promise ((resolve) => {
        if(socket.isVersionCheck = false) {
            let hack = new HackSchema({
                hackID : 100,
                hackName : 'Client Crack - Version Check Skip',
                hackUser : 'Not Checked'
            })
            return socket.disconnect(true)
        }
        socket.emit('Ownership Check Req')
        socket.isOwnershipCheck = false
        setTimeout(() => {
            if(!ownershipCheck) {
                return socket.disconnect(true)
            }
        }, 1000)
        socket.on('Ownership Check Res', (param) => {
            axios({
                method : 'get',
                url : 'https://api.steampowered.com/ISteamUserAuth/AuthenticateUserTicket/v1/',
                data : {
                    key : publisherKey,
                    appid : appid,
                    ticket : ticket
                }
            })
            axios({
                method : 'get',
                url : 'http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/',
                data : {
                    key : key,
                    steamids : id
                }
            })
        })
    })
}

exports.enterServer = (socket) => {
    return new Promise((resolve) => {

    })
}