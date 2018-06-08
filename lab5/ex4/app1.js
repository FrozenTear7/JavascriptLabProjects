const express = require('express')
const logger = require('morgan')
const ejs = require('ejs')
const request = require('request')

const app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')
app.use(logger('dev'))
app.use(express.static(__dirname + '/public'))

let data = []

request('https://api-v3.mojepanstwo.pl/dane/krs_podmioty.json?conditions[krs_podmioty.wojewodztwo_id]=7&limit=1000', (error, response, body) => {
  JSON.parse(body).Dataobject.forEach(elem => {
    request('https://api-v3.mojepanstwo.pl/dane/krs_podmioty/' + elem.id + '.json?layers[]=firmy', (error, response, contents) => {
      let companiesData = (JSON.parse(contents))
      if (companiesData.layers.firmy.length > 0) {
        companiesData.layers.firmy.forEach(udzialy => {
          console.log('Udzialowcy')
          console.log(udzialy)
          data.push(udzialy)
        })
      }
    })
  })
})

app.get('/', (req, res) => {
  res.render('index', {data: data})
})

app.listen(3000, () => {
  console.log('Aplikacja jest dostępna na porcie 3000')
})

