"use strict";

let expect = require("chai").expect;
let events = require("events");
let httpMocks = require("node-mocks-http");

const tm = require("../../../utils/tokenManager");
const UserRoles = require("../../../enums").UserRoles;
let middleware = require("../../../router/middlewares/auth.middleware");

describe("auth.middleware", () => {
  it("> should reject token with error 401", (done) => {
    tm.generateToken({ unm: "user", url: UserRoles.ADMIN }).then((token) => {
      // GIVEN
      let req = httpMocks.createRequest({
        method: "GET",
        url: "/api/missions/create/anonymous",
      });

      let res = httpMocks.createResponse({
        eventEmitter: events.EventEmitter,
      });

      res.on("end", () => {
        expect(res.statusCode).to.equal(401);
        done();
      });

      // WHEN
      middleware()(req, res, undefined);
    });
  });

  it("> should reject token with error 400 when authorization header malformed", (done) => {
    tm.generateToken({ unm: "user", url: UserRoles.ADMIN }).then((token) => {
      // GIVEN
      let req = httpMocks.createRequest({
        method: "GET",
        url: "/api/missions/create/anonymous",
        headers: { authorization: `${token}` },
      });

      let res = httpMocks.createResponse({
        eventEmitter: events.EventEmitter,
      });

      res.on("end", () => {
        expect(res.statusCode).to.equal(400);
        done();
      });

      // WHEN
      middleware()(req, res, undefined);
    });
  });

  it("> should reject undecryptable token with error 500", (done) => {
    tm.generateToken({ unm: "user", url: UserRoles.ADMIN }).then((token) => {
      // GIVEN
      let req = httpMocks.createRequest({
        method: "GET",
        url: "/api/missions/create/anonymous",
        headers: { authorization: `Bearer invalidToken` },
      });

      let res = httpMocks.createResponse({
        eventEmitter: events.EventEmitter,
      });

      res.on("end", () => {
        expect(res.statusCode).to.equal(500);
        done();
      });

      // WHEN
      middleware()(req, res, undefined);
    });
  });

  it("> should accept token", (done) => {
    tm.generateToken({ unm: "user", url: UserRoles.ADMIN }).then((token) => {
      // GIVEN
      let req = httpMocks.createRequest({
        method: "GET",
        url: "/api/missions/create/anonymous",
        headers: { authorization: `Bearer ${token}` },
      });

      let res = httpMocks.createResponse({
        eventEmitter: events.EventEmitter,
      });

      let next = () => {
        expect(req.token.unm).to.equal("user");
        expect(req.token.url).to.equal(UserRoles.ADMIN);
        done();
      };

      // WHEN
      middleware()(req, res, next);
    });
  });

  it("> should reject with 403 when role not allowed", (done) => {
    tm.generateToken({ unm: "user", url: UserRoles.WORKER }).then((token) => {
      // GIVEN
      let req = httpMocks.createRequest({
        method: "GET",
        url: "/api/missions/create/anonymous",
        headers: { authorization: `Bearer ${token}` },
      });

      let res = httpMocks.createResponse({
        eventEmitter: events.EventEmitter,
      });

      res.on("end", () => {
        expect(res.statusCode).to.equal(403);
        done();
      });

      // WHEN
      middleware([UserRoles.ADMIN])(req, res, undefined);
    });
  });

  it("> should accept token with allowed role", (done) => {
    tm.generateToken({ unm: "user", url: UserRoles.ADMIN }).then((token) => {
      // GIVEN
      let req = httpMocks.createRequest({
        method: "GET",
        url: "/api/missions/create/anonymous",
        headers: { authorization: `Bearer ${token}` },
      });

      let res = httpMocks.createResponse({
        eventEmitter: events.EventEmitter,
      });

      let next = () => {
        expect(req.token.unm).to.equal("user");
        expect(req.token.url).to.equal(UserRoles.ADMIN);
        done();
      };

      // WHEN
      middleware([UserRoles.ADMIN])(req, res, next);
    });
  });
});
