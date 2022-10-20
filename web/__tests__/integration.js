/* eslint-disable @typescript-eslint/no-var-requires */
const supertest = require('supertest');
const { expect, describe, it, beforeAll } = require('@jest/globals');
const pg = require('pg');
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
      console.log(process.env);
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
});
