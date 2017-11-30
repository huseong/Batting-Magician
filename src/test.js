module.exports = io => {
    io.on('connect', socket => {
        console.log('[client] socket connected: ' + socket.id)
        socket.pos = 0
        socket.emit('start move', { speed: 0.5 })
        setInterval(() => {
            socket.pos += 0.5
            if(socket.pos % 30 == 0)
                console.log('도차크')
        }, 100)
        setInterval(() => {
            console.log(socket.pos)
            socket.emit('pos', {pos:socket.pos})
        }, 1000)
    })
}