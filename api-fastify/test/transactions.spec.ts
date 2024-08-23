import { beforeAll, afterAll, describe, it, expect, beforeEach } from 'vitest'
import { execSync } from 'node:child_process'
import request from 'supertest'
import { app } from '../src/app'

describe('Transactions routes', () => {
    beforeAll( async () => {        
        await app.ready()
    })
    
    afterAll( async () => {
        await app.close()
    })

    // clean up the database before each test
    beforeEach(() => {
        execSync('npm run knex migrate:rollback --all') // before each test undo 
        execSync('npm run knex migrate:latest') // before each test will create a migrate from scretch
    })
    
    
    it('User can create a new transaction'), async () => {
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

        const cookies = createTransactionResponse.get('Set-Cookie')

        if (!cookies) {
            throw new Error('No cookies were returned from the server')
        }
        
        const listTransactionsResponse = await request(app.server)
            .get('/transactions')
            .set('Cookie', cookies)

        expect(listTransactionsResponse.body.transactions).toEqual([
            expect.objectContaining({
                title: 'New transaction',
                amount: 250,
            })
        ])
    }

    it('should be able to get a specific transaction'), async () => {
        const createTransactionResponse = await request(app.server)
            .post('/transactions')
            .send({
                title: 'New transaction',
                amount: 250,
                type: 'credit'
            })

        const cookies = createTransactionResponse.get('Set-Cookie')

        if (!cookies) {
            throw new Error('No cookies were returned from the server')
        }
        
        const listTransactionsResponse = await request(app.server)
            .get('/transactions')
            .set('Cookie', cookies)

            const transactionId = listTransactionsResponse.body.transactions[0].id

            const getTransactionResponse = await request(app.server)
            .get(`/transactions/${transactionId}`)
            .set('Cookie', cookies)
            .expect(200)

        expect(listTransactionsResponse.body.transactions).toEqual([
            expect.objectContaining({
                title: 'New transaction',
                amount: 250,
            })
        ])
    }

    it('should be able to get the summary'), async () => {
        const createTransactionResponse = await request(app.server)
            .post('/transactions')
            .send({
                title: 'New transaction',
                amount: 5000,
                type: 'credit'
            })

        const cookies = createTransactionResponse.get('Set-Cookie')

        if (!cookies) {
            throw new Error('No cookies were returned from the server')
        }
        
        await request(app.server)
            .post('/transactions')
            .set('Cookie', cookies)
            .send({
                title: 'New transaction 2',
                amount: 1000,
                type: 'credit'
        })

        await request(app.server)
        .post('/transactions')
        .set('Cookie', cookies)
        .send({
            title: 'New transaction 3',
            amount: 4000,
            type: 'debit'
        })

        
        const listTransactionsResponse = await request(app.server)
            .get('/transactions/summary')
            .set('Cookie', cookies)

        expect(listTransactionsResponse.body.transactions).toEqual([
            expect.objectContaining({
                amount: 1000,
            })
        ])
    }
})
