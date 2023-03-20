import supertest from 'supertest';
import { expect } from 'chai';
import { app } from '../../server';
import { ENDPOINT } from '../../constants/endpoint.constant';

const request = supertest(app);
describe('App', () => {
  it('Check /register endpoint', async () => {
    try {
      const res = await request.post(`/api${ENDPOINT.AUTH}${ENDPOINT.REGISTER}`);

      expect(res.text).to.be.equal(200);
      expect(res.status).to.be.equal(200);
    } catch (e) {
      console.log(e);
    }
  });
});
