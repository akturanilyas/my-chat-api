import request from 'supertest';
import { app } from '../server';
import { describe, expect, test } from '@jest/globals';

describe('App', () => {
  test('works properly', (done) => {
    request(app)
      .get('/')
      .expect(200, (err, res) => {
        if (err) return done(err);
        expect(res.text).toBe('Hello world');
        return done();
      });
  });

  test('test', (done) => {
    expect(2).toBe(2);
    return done();
  });
});
