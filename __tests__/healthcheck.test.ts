import app from '../src/main';
import request from 'supertest';

describe('Healthcheck (GET \'\\\')', () => {

    it('should return 200', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });

});