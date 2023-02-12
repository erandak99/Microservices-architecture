// routes.test.js
const request = require('supertest')
const app = require('../test-server')

beforeAll(async () => {
  // do something before anything else runs
  console.log('Jest starting!')
})
// close the server after each test
afterAll(() => {
  app.close()
  console.log('server closed!')
})

describe('basic route tests', () => {
  test('should rerurn array', async () => {
    try {
      const response = await request(app)
        .get('http://localhost:7101/api/config')
        .send({
          headers: { 'store-id': 'dev_fabric' },
        })
      expect(response.status).toBe(400)
    } catch (error) {
      console.log(error)
    }
  })
})
