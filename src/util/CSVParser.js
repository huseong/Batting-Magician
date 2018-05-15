const fs = require('fs')

const loadAsset = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if(err || !data) {
        console.log(err)
        return reject('File Load Error')
      }
      resolve(data)
    })
  })

exports.getTwoDimensionalArray = path => 
new Promise((resolve, reject) => {
  loadAsset(path)
  .then(data => {
    resolve(data.split('\r\n').map(line => line.split(',')))
  })
  .catch(reject)
})