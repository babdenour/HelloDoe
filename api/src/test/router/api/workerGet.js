'use strict';

let httpMocks = require('node-mocks-http');
let expect = require('chai').expect;

const endpoint = require('../../../router/api/workers/workerGet');
const crypto = require('../../../utils/crypto');
const Worker = require('../../../models').Worker;
const UserRoles = require('../../../enums').UserRoles;

describe('workerGet', () => {
  let workerDetails = {
    profile: {
      first_name: 'first_name',
      last_name: 'last_name',
    },
    workProfile: {
      siret: '111222333',
      rating: 4,
    },
  };

  let requestBody;
  let requestParams;

  let adminToken;
  let workerToken;
  let unknownToken;

  beforeEach((done) => {
    new Worker(workerDetails)
      .save()
      .then((worker) => {
        return crypto.encrypt(JSON.stringify({ worker: { id: worker._id } }));
      })
      .then((encryptedParams) => {
        requestBody = {};
        requestParams = { encryptedParams };

        adminToken = { url: UserRoles.ADMIN, unm: 'name' };
        workerToken = { url: UserRoles.WORKER, unm: 'name' };
        unknownToken = { url: 'unknown', unm: 'name' };

        done();
      });
  });

  afterEach((done) => {
    Worker.remove()
      .exec()
      .then(() => {
        done();
      });
  });

  it('should respond 404 when unknown role', (done) => {
    let request = httpMocks.createRequest({
      method: 'POST',
      url: '/api/missions/new',
      body: requestBody,
      params: requestParams,
      token: unknownToken,
    });

    let response = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter,
    });

    response.on('end', () => {
      expect(response.statusCode).to.equal(404);

      done();
    });

    endpoint(request, response);
  });

  it('should send worker details for worker token', (done) => {
    let request = httpMocks.createRequest({
      method: 'POST',
      url: '/api/missions/new',
      body: requestBody,
      params: requestParams,
      token: workerToken,
    });

    let response = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });

    response.on('end', () => {
      let responseData = JSON.parse(response._getData());

      expect(response.statusCode).to.equal(200);
      expect(responseData.worker.profile).to.equal(undefined);
      expect(responseData.worker.workProfile.siret).to.equal('111222333');
      expect(responseData.worker.workProfile.rating).to.equal(4);

      done();
    });

    endpoint(request, response);
  });

  it('should send worker details for admin token', (done) => {
    let request = httpMocks.createRequest({
      method: 'POST',
      url: '/api/missions/new',
      body: requestBody,
      params: requestParams,
      token: adminToken,
    });

    let response = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });

    response.on('end', () => {
      let responseData = JSON.parse(response._getData());

      expect(response.statusCode).to.equal(200);
      expect(responseData.worker.profile.first_name).to.equal('first_name');
      expect(responseData.worker.profile.last_name).to.equal('last_name');
      expect(responseData.worker.workProfile.siret).to.equal('111222333');
      expect(responseData.worker.workProfile.rating).to.equal(4);

      done();
    });

    endpoint(request, response);
  });
});
