/**
 * Unit test for public/kijiji.ts
 * 
 * Author: Tem Tamre
 * Contact: temtamre@gmail.com
 */

const request = require('supertest')
import app from '../public/app'

describe('app.ts', () => {
    let test_app: any

    beforeEach(() => {
        test_app = app.listen(8080, () => {
            console.info(`Listening at http://localhost:8080...`)
        })
    })

    afterEach(() => {
        test_app.close()
    })

    it('GET main webpage', () => {
        request(test_app)
        .get('/')
        .expect(200)
    })
    
    it('POST search results', () => {
        request(test_app)
        .post('/')
        .send({ make: 'Toyota', model: 'Corolla', year: '2010' })
        .expect(200)
    })
})