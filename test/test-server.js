var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('Session Tests', () => {
  it('should HAPPY PATH on request to /sessions GET', (done) => {
    chai.request(server)
      .get('/sessions')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
  it('should create a new session on request to /sessions POST');
  it('should update a session on request to /:session_id:/sessions PUT');
  it('should delete a session on request to /:session_id:/sessions DELETE');
});

describe('Actions Test', () => {
  it('should HAPPY PATH on request to /actions GET', (done) => {
    chai.request(server)
      .get('/actions')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
});

describe('Drills Tests', () => {
  it('should get all drills on request to /drills GET');
  it('should get a single drill on request to /:drill_id:/drills GET');
  it('should create a new drill on request to /drills POST');
  it('should update a drill on request to /:drill_id:/drills PUT');
  it('should delete a drill on request to /:drill_id:/drills DELETE');
})

describe('Organizations Tests', () => {
  it('should HAPPY PATH on request to /organizations/:organization_id/players GET', (done) => {
    chai.request(server)
      .get('/organizations/1/players')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
});