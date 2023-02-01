let path = require('path')
let express = require('express')
let api = require('./api')
let bodyParser = require('body-parser')
let port = 3001

let app = express()

app.use(bodyParser.json())
app.use('/api', api)

app.listen(port, 'localhost', function (err) {
  if (err) {
    console.log(err)
    return
  }
})
