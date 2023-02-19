import request from 'supertest';
import { expect } from 'chai';
import { app } from '../server';

describe('App', () => {
  before((done) => {
    app.listen((err: any) => {
      if (err) return done(err);
      return done();
    });
  });

  it('works properly', (done) => {
    request(app)
      .get('/')
      .expect(200, (err, res) => {
        if (err) return done(err);
        expect(res.text).to.be.equals('Hello world');
        return done();
      });
  });

  it('test', (done) => {
    expect(2).equal(2);
    return done();
  });
});
