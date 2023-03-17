import request from 'supertest';
import { expect } from 'chai';
import { app } from '../../server';
import { ENDPOINT } from '../../constants/endpoint.constant';

describe('App', () => {
  it('Check /register endpoint', async () => {
    const res = await request(app).post(`/api${ENDPOINT.AUTH}${ENDPOINT.REGISTER}`).send();
    expect(res.text).to.be.equal(200);
    expect(res.status).to.be.equal(200);
  });
});
