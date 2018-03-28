'use strict'

var expect = chai.expect
var isChar = new RegExp('\\D')
var isNumber = new RegExp('\\d')
var sumaLiczb = 0

function suma (x, y) {
  return x + y
}

function cyfry (napis) {
  var sumaCyfr = 0

  for (var i = 0; i < napis.length; i++) {
    if (isNumber.test(napis[i])) {
      sumaCyfr += parseInt(napis[i])
    }
  }

  return sumaCyfr
}

function litery (napis) {
  var sumaLiter = 0

  for (var i = 0; i < napis.length; i++) {
    if (isChar.test(napis[i])) {
      sumaLiter++
    }
  }

  return sumaLiter
}

function dodajDoSumy (napis) {
  var endIndex = 0

  for (var i = 0; i < napis.length; i++) {
    if (!isNumber.test(napis[i])) {
      break
    }

    endIndex++
  }

  if (endIndex)
    sumaLiczb += parseInt(napis.substring(0, endIndex))
}

function printSum () {
  while (true) {
    var input = window.prompt()

    if (input == null)
      break

    dodajDoSumy(input)

    document.write('\t' + String(cyfry(input)) + '\t' + String(litery(input)) + '\t' + String(sumaLiczb))
    document.write('<br>')
  }
}

describe('Funkcja suma()', function () {
  it('Zwraca 4 dla 2+2', function () {
    expect(suma(2, 2)).to.equal(4)
  })
  it('Zwraca 0 dla -2+2', function () {
    expect(suma(-2, 2)).to.equal(0)
  })
})

describe('Funkcja cyfry()', function () {
  it('Zwraca 6 dla 123', function () {
    expect(cyfry("123")).to.equal(6)
  })
  it('Zwraca 0 dla abc', function () {
    expect(cyfry("abc")).to.equal(0)
  })
  it('Zwraca 3 dla ab12', function () {
    expect(cyfry("ab12")).to.equal(3)
  })
  it('Zwraca 3 dla 12ab', function () {
    expect(cyfry("12ab")).to.equal(3)
  })
  it('Zwraca 0 dla pustego wyrazu', function () {
    expect(cyfry("")).to.equal(0)
  })
})

describe('Funkcja litery()', function () {
  it('Zwraca 0 dla 123', function () {
    expect(litery("123")).to.equal(0)
  })
  it('Zwraca 3 dla abc', function () {
    expect(litery("abc")).to.equal(3)
  })
  it('Zwraca 2 dla ab12', function () {
    expect(litery("ab12")).to.equal(2)
  })
  it('Zwraca 2 dla 12ab', function () {
    expect(litery("12ab")).to.equal(2)
  })
  it('Zwraca 0 dla pustego wyrazu', function () {
    expect(litery("")).to.equal(0)
  })
})

describe('Funkcja sumaLiczb()', function () {
  it('Zwraca 0 dla 123', function () {
    sumaLiczb = 0
    dodajDoSumy("123")
    expect(sumaLiczb).to.equal(123)
  })
  it('Zwraca 3 dla abc', function () {
    sumaLiczb = 0
    dodajDoSumy("abc")
    expect(sumaLiczb).to.equal(0)
  })
  it('Zwraca 2 dla ab12', function () {
    sumaLiczb = 0
    dodajDoSumy("ab12")
    expect(sumaLiczb).to.equal(0)
  })
  it('Zwraca 2 dla 12ab', function () {
    sumaLiczb = 0
    dodajDoSumy("12ab")
    expect(sumaLiczb).to.equal(12)
  })
  it('Zwraca 0 dla pustego wyrazu', function () {
    sumaLiczb = 0
    dodajDoSumy("")
    expect(sumaLiczb).to.equal(0)
  })
})