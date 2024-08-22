import { beforeAll, afterAll, describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

describe('Transactions routes', () => {
    beforeAll( async () => {
        await app.ready()
    })
    
    afterAll( async () => {
        await app.close()
    })
    
    it.skip('User can create a new transaction'), async () => {
        await request(app.server)
            .post('/transactions')
            .send({
                title: 'New transaction',
                amount: 1250,
                type: 'credit'
            })
            .expect(201)
    }

    it('should be able to list all transactions'), async () => {
        const createTransactionResponse = await request(app.server)
            .post('/transactions')
            .send({
                title: 'New transaction',
                amount: 250,
                type: 'credit'
            })
            console.log('print response', createTransactionResponse.headers)

        const cookies = createTransactionResponse.get('Set-Cookie') || []

        if (!cookies) {
            throw new Error('No cookies were returned from the server')
        }
        
        const listTransactionsResponse = await request(app.server)
            .get('/transactions')
            .set('Cookie', cookies)
            .expect(200)

        expect(listTransactionsResponse.body.transactions).toEqual([
            expect.objectContaining({
                title: 'New transaction',
                amount: 250,
            })
        ])
    }
})
