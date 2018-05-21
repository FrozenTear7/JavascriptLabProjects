const supertest = require('supertest')

const server = supertest.agent('http://localhost:3000')

describe('GET /', () => {
  it('respond with html', (done) => {
    server
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done)
  })
})

describe('app1 test', () => {
  it('app1 get sum of x and y', (done) => {
    server
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done)
      .expect('<div>1 + 2 = 3</div>')
  })
})

describe('app2 test', () => {
  it('app2 get sum of x and y', (done) => {
    server
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done)
      .expect('<!DOCTYPE html><html><head><title>Pierwsza strona</title></head><body><h1>Witaj Świecie</h1><div>1 + 2 = 3</div></body></html>')
  })
})

describe('app1 test 2', () => {
  it('app1 get sum of x and y from url', (done) => {
    server
      .get('/add/2/4')
      .expect('Content-Type', /html/)
      .expect(200, done)
      .expect('<div>2 + 4 = 6</div>')
  })
})

describe('app2 test 2', () => {
  it('app2 get sum of x and y from url', (done) => {
    server
      .get('/add/2/4')
      .expect('Content-Type', /html/)
      .expect(200, done)
      .expect('<!DOCTYPE html><html><head><title>Pierwsza strona</title></head><body><h1>Witaj Świecie</h1><div>2 + 4 = 6</div></body></html>')
  })
})