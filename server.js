var express = require('express')
var app = express()
const PORT = 3000

var path = require('path')

app.use(express.static('static'))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/static/index.html'))
})

app.listen(PORT, function () {
    console.log('Server is running on Port: ' + PORT)
})
