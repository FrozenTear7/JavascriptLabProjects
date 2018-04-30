const fs = require('fs')

if (fs.existsSync(process.argv[2])) {
  const stats = fs.lstatSync(process.argv[2])
  if (stats.isFile())
    console.log(fs.readFileSync(process.argv[2], 'utf8'))
  else if (stats.isDirectory())
    console.log('Directory')
} else
  console.log('Doesnt exist or wrong input')
