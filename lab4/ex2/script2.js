const fs = require('fs')
const fs2 = require('fs-extra')

const script2 = (path, action, mod) => {
  if (action === 'mod') {
    const fd = fs.openSync(path, 'a+')
    fs.fchmodSync(fd, mod)
  } else if (action === 'copy') {
    fs2.copySync(path, './tmp')
    fs2.emptydirSync(path)
  } else
    console.log('NAAH')
}

script2(process.argv[2], process.argv[3], process.argv[4])

module.exports = {
  script2
}
