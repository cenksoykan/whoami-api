const express = require('express')
const app = express()
const path = require('path')

const port = process.env.PORT || 8080

app.listen(port, () => console.log('Example app listening on port ' + port) )

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')) )

app.get('/whoami', (req,res) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress
  res.json({
    'ipaddress': ip,
    'language': req.headers["accept-language"].split(',')[0],
    'software': req.headers['user-agent'].split(') ')[0].split(' (')[1]
  })
})
