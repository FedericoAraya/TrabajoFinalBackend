import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/app.js'

const expect = chai.expect
chai.use(chaiHttp)

describe('Prueba de Session', () => {
  describe('GET /session/register', () => {
    it('Render Register', async () => {
      const res = await chai.request(app).get('/session/register')
      expect(res).to.have.status(200)
      expect(res).to.be.html
    })
  })

  describe('GET /session/login', () => {
    it('Render Login', async () => {
      const res = await chai.request(app).get('/session/login')
      expect(res).to.have.status(200)
      expect(res).to.be.html
    })
  })

  describe('POST /session/register', () => {
    it('Registro de usuario', async () => {
      const res = await chai.request(app).post('/session/register').send({
        first_name: 'Federico',
        last_name: 'Araya',
        email: 'federico.araya@gmail.com',
        password: 'abc123',
      })
      expect(res).to.have.status(200)
    })
  })

  describe('GET /session/login', () => {
    it('Prueba de renderizado del login', async () => {
      const res = await chai.request(app).get('/session/login')
      expect(res).to.have.status(200)
      expect(res).to.be.html
    })
  })

  describe('POST /session/login', () => {
    it('Prueba de login', async () => {
      const res = await chai.request(app).post('/session/login').send({
        email: 'federico.araya@gmail.com',
        password: 'abc123',
      })
      expect(res).to.have.status(200)
    })
  })
})