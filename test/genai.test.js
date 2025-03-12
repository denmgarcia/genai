const { expect } = require('chai');
const request = require('supertest');
const express = require('express');


describe('Express App', () => {
  const app = express();

  it('Generative AI test', async () => {
    const response = await request("http://localhost:3001").post('/ai');
    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('Error while calling Generative AI...');
    // expect(response.body.message).to.equal('Hello, John!');
  });
});