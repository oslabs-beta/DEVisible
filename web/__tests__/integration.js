/* eslint-disable @typescript-eslint/no-var-requires */
const supertest = require('supertest');
const { describe, it, beforeAll, expect } = require('@jest/globals');
const pg = require('pg');
// eslint-disable-next-line @typescript-eslint/naming-convention
const db_url = process.env.TEST_DATABASE_URL;

const server = 'http://localhost:3000';

describe('User functionality', () => {
  beforeAll(async () => {
    // wipe the database using pg manually
    // this is to be EXTRA SUPER DOUBLE CAREFUL that we don't accidently wipe the main db
    const pool = new pg.Pool({
      connectionString: db_url,
    });
    await pool.query('DELETE FROM "Build";');
    await pool.query('DELETE FROM "Repo";');
    await pool.query('DELETE FROM "User";');
  });

  describe('Registering a new user', () => {
    it('responds with a 200 status and creates a user', () => {
      const body = {
        username: 'test',
        plainPassword: 'test1',
        email: 'test@test.com',
      };
      return supertest(server)
        .post('/userAPI/signup')
        .send(body)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });
    it('blocks a user being created with an existing username', () => {
      const body = {
        username: 'test',
        plainPassword: 'test1',
        email: 'test@test.com',
      };
      return supertest(server).post('/userAPI/signup').send(body).expect(409);
    });
    it('does not create a user if no username is provided', () => {
      return supertest(server)
        .post('/userAPI/signup')
        .send({ plainPassword: 'hellothere1', email: 'null@null.com' })
        .expect(400);
    });
    it('does not create a user if no password is provided', () => {
      return supertest(server)
        .post('/userAPI/signup')
        .send({ username: 'bob', email: 'null@null.com' })
        .expect(400);
    });
    it('does not create a user if no email is provided', () => {
      return supertest(server)
        .post('/userAPI/signup')
        .send({ username: 'bob', plainPassword: 'hunter2' })
        .expect(400);
    });
  });

  describe('Login functionality', () => {
    it('responds with a 200 status and logs in a user', () => {
      const body = {
        email: 'test@test.com',
        plainPassword: 'test1',
      };
      return supertest(server)
        .post('/userAPI/login')
        .send(body)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect('Set-Cookie', /access_token/);
    });
    it('responds with a 401 status if the username is incorrect', () => {
      const body = {
        email: 'a@test.com',
        plainPassword: 'test1',
      };
      return supertest(server).post('/userAPI/login').send(body).expect(401);
    });
    it('responds with a 401 status if the password is incorrect', () => {
      const body = {
        email: 'test@test.com',
        plainPassword: 'test2',
      };
      return supertest(server).post('/userAPI/login').send(body).expect(401);
    });
  });

  describe('Logout functionality', () => {
    it('responds with a 204 status and logs out a user', () => {
      return supertest(server)
        .delete('/userAPI/login')
        .expect(204)
        .expect(
          // it clears the cookie
          'Set-Cookie',
          /access_token=; Path=\/; Expires=Thu, 01 Jan 1970 00:00:00 GMT/
        );
    });
  });

  describe('GET cookie user functionality', () => {
    const agent = supertest.agent(server);
    const body = {
      email: 'test@test.com',
      plainPassword: 'test1',
    };
    beforeAll(async () => {
      await agent.post('/userAPI/login').send(body);
    });
    it("reads back the user's username and id when invoked with a valid cookie", () => {
      return agent
        .get('/userAPI/login')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect((res) => {
          expect(res.body.id).toBeDefined();
          expect(res.body.username).toBe('test');
        });
    });
    it('responds with a 401 status if the cookie is invalid', () => {
      return supertest(server).get('/userAPI/login').expect(401);
    });
  });

  describe('API Token functionality', () => {
    const agent = supertest.agent(server);
    const body = {
      email: 'test@test.com',
      plainPassword: 'test1',
    };
    beforeAll(async () => {
      await agent.post('/userAPI/login').send(body);
    });
    it("responds with the user's API token if requested with a valid cookie", () => {
      return agent.get('/userAPI/getToken').expect(200);
    });
    it('responds with a 403 status when not logged in', () => {
      return supertest(server).get('/userAPI/getToken').expect(403);
    });
  });
});
