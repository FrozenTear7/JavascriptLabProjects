const express = require('express')
const logger = require('morgan')

const app = express()
const x = 1
const y = 2

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.render('index', {x: x, y: y})
})

app.listen(3000, () => {
  console.log('Aplikacja jest dostępna na porcie 3000')
})