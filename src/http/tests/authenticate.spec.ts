import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Authenticate (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should authenticate user', async () => {
        await request(app.server)
            .post('/users')
            .send({
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: 'password'
            });

        const response = await request(app.server).post('/sessions').send({
            email: 'johndoe@example.com',
            password: 'password'
        })

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

});

