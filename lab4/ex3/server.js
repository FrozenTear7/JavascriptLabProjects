const http = require('http')
const url = require('url')
const fs = require('fs')

http.createServer(function (request, response) {
  const url_parts = url.parse(request.url, true)

  if (url_parts.pathname === '/submit') {
    const path = url_parts.query['path']

    fs.access(path, fs.constants.R_OK | fs.constants.W_OK, (err) => {
      if (err) {
        response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})
        response.write(err.toString())
        response.end()
      }

      fs.lstat(path, (err, stats) => {
        if (err) {
          response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})
          response.write(err.toString())
          response.end()
        }

        if (stats.isFile())
          fs.readFile(path, 'utf8', (err, contents) => {
            if (err) {
              response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})
              response.write(err.toString())
              response.end()
            }


            response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})
            response.write(contents)
            response.end()
          })
        else if (stats.isDirectory()) {
          response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})
          response.write('Directory')
          response.end()
        }
      })
    })
  }
  else {
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    response.write('<form method="GET" action="/submit">')
    response.write('<label for="path">Podaj swoje imię</label>')
    response.write('<input name="path">')
    response.write('<br>')
    response.write('<input type="submit">')
    response.write('<input type="reset">')
    response.write('</form>')
    response.end()
  }
}).listen(8080)
console.log('Uruchomiono serwer na porcie 8080')
console.log('Aby zakończyć działanie serwera, naciśnij \'CTRL+C')
