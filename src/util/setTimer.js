module.exports = time => 
  new Promise(resolve => {
    let timer = setInterval(() => {
      if(--time > 0) return
      clearInterval(timer)
      resolve() 
    }, 1000) 
  })