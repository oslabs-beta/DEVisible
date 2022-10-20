/* eslint-disable @typescript-eslint/no-var-requires */
const supertest = require('supertest');
const { expect, describe, it } = require('@jest/globals');

const server = 'http://localhost:3000';

describe('User functionality', () => {
  describe('Registering a new user', () => {
    it('responds with a 200 status and a properly formatted user jwt', () => {
      const body = {
        username: 'test',
        plainPassword: 'test1',
        email: 'test@test.com',
      };
      return supertest(server)
        .post('/userAPI/signup')
        .send(body)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect((res) => {
          expect(res.username === body.username);
        });
    });
  });
});
