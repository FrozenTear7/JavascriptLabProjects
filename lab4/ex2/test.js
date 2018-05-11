const expect = require('chai').expect
const modul = require('./script2')

describe('Move files', () => {
  it('Copy tmp2 to tmp', () => {
    let filesBefore = null
    let filesAfter = null

    fs.readdir('./tmp2', (err, files) => {
      filesBefore = files
    })

    modul.script2('./tmp2', 'copy', null)

    fs.readdir('./tmp', (err, files) => {
      filesAfter = files
    })

    expect(filesBefore).to.equal(filesAfter)
  })
})
