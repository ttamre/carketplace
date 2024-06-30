/**
* _CARKETPLACE
 * Copyright (C) 2024 Tem Tamre
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 * 
 * 
 * Unit test for public/kijiji.ts
 * 
 * Author: Tem Tamre
 * Contact: temtamre@gmail.com
 */

const request = require('supertest')
import app from '../public/app'

describe('app.ts', () => {
    let test_app : any

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