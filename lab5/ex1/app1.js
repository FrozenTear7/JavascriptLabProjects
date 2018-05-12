const express = require('express')
const logger = require('morgan')
const ejs = require('ejs')

const app = express()
const x = 1
const y = 2

app.use(logger('dev'))
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.send(ejs.render('<div><%= x %> + <%= y %> = <%= x + y %></div>', {x: x, y: y}))
})

app.listen(3000, () => {
  console.log('Aplikacja jest dostępna na porcie 3000')
})
