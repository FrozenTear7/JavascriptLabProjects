const expect = require('chai').expect
const modul = require('../modul')

describe('Funkcja suma()', () => {
  it('Zwraca 4 dla 2+2', () => {
    expect(modul.suma(2, 2)).to.equal(4)
  })
  it('Zwraca 0 dla -2+2', () => {
    expect(modul.suma(-2, 2)).to.equal(0)
  })
})
