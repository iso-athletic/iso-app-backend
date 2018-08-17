var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('Session Tests', () => {
  it('should get all sessions on request to /sessions GET', (done) => {
    chai.request(server)
      .get('/sessions')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
  it('should get a single session on request to /:session_id:/sessions GET');
  it('should create a new session on request to /sessions POST');
  it('should update a session on request to /:session_id:/sessions PUT');
  it('should delete a session on request to /:session_id:/sessions DELETE')
})

describe('Drills Tests', () => {
  it('should get all drills on request to /drills GET');
  it('should get a single drill on request to /:drill_id:/drills GET');
  it('should create a new drill on request to /drills POST');
  it('should update a drill on request to /:drill_id:/drills PUT');
  it('should delete a drill on request to /:drill_id:/drills DELETE')
})

describe('Players Tests', () => {
  it('should get all players associated with an organization on request to /players/:organization_id: GET', (done) => {
    chai.request(server)
      .get('/players/1')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  })
})