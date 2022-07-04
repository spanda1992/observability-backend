const request = require('supertest')
const app = require('../app')

test('Testing Entity List', async() =>{

   const res = await request(app)
            .get('/entityList')
            .expect(200)

    
})