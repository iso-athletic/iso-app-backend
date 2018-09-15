var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
const Sequelize = require('sequelize');
var should = chai.should();

chai.use(chaiHttp);

describe('Session Tests', () => {
  it('should HAPPY PATH on request to /sessions GET', (done) => {
    chai.request(server)
      .get('/api/sessions')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });

  it('should create a new session on request to /sessions POST', (done) => {
    chai.request(server)
      .post('/api/sessions')
      .send({
        start_time: Sequelize.NOW,
        organization_id: 1
      })
      .end(function (err, res) {
        res.should.have.status(201);
        chai.request(server)
          .delete('/api/sessions/' + res.body.id)
          .end(function (err, res) {
            done();
          })
      });
  });

  it('should return 400 if organization_id is not valid on request to /sessions POST', (done) => {
    chai.request(server)
      .post('/api/sessions')
      .send({
        start_time: Sequelize.NOW,
        organization_id: 0
      })
      .end(function (err, res) {
        res.should.have.status(400);
        done();
      })
  });

  it('should update(end) a session on request to /:session_id:/sessions PUT', (done) => {
    chai.request(server)
      .post('/api/sessions')
      .send({
        start_time: Sequelize.NOW,
        organization_id: 1
      })
      .end(function (err, res) {
        chai.request(server)
          .put('/api/sessions/' + res.body.id)
          .send({ end_time: Sequelize.NOW })
          .end(function (err, res) {
            res.should.have.status(202);
            chai.request(server)
              .delete('/api/sessions/' + res.body.id)
              .end(function (err, res) {
                done();
              })
          });
      })
  });

});

describe('Actions Test', () => {
  it('should HAPPY PATH on request to /actions GET', (done) => {
    chai.request(server)
      .get('/api/actions')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
  it('should HAPPY PATH on request to /actions POST', (done) => {
    chai.request(server)
      .post('/api/actions')
      .send({ type: 'test'})
      .end((res) => {
        res.should.have.status(201)
        chai.request(server)
          .delete('/api/actions' + res.body.id)
          .end(() => {
            done()
          })
      })
  });
});

describe('Drills Tests', () => {
  it('should create a new drill on request to /drills POST', (done) => {
    chai.request(server)
      .post('/api/sessions/1/drills')
      .send({
        type: "scrimmage",
        start_time: Sequelize.NOW,
        session_id: 1
      })
      .end(function (err, res) {
        res.should.have.status(201);
        chai.request(server)
          .delete('/api/drills/' + res.body.id)
          .end(function (err, res) {
            done();
          })
      });
  });

  it('should return 400 if session_id is not valid on request to /drills POST', (done) => {
    chai.request(server)
      .post('/api/sessions/0/drills')
      .send({
        type: "scrimmage",
        start_time: Sequelize.NOW
      })
      .end(function (err, res) {
        res.should.have.status(400);
        done();
      });
  });

  it('should update a drill on request to /:drill_id:/drills PUT', (done) => {
    chai.request(server)
      .post('/api/sessions/1/drills')
      .send({
        type: "scrimmage",
        start_time: Sequelize.NOW
      })
      .end(function (err, res) {
        chai.request(server)
          .put('/api/drills/' + res.body.id)
          .send({ end_time: Sequelize.NOW })
          .end(function (err, res) {
            res.should.have.status(202);
            chai.request(server)
              .delete('/api/drills/' + res.body.id)
              .end(function (err, res) {
                done();
              })
          });
      })
  });

})

describe('Events Tests', () => {

  var drillId = -1;

  before((done) => {
    chai.request(server)
      .post('/api/sessions/1/drills')
      .end((res) => {
        drillId = res.body.id;
        console.log(drillId);
        res.should.have.status(201)
        done();
      })
  });

  after((done) => {
    chai.request(server)
      .delete('/api/drills/' + drillId)
      .end((res) => {
        res.should.have.status(204)
        done();
      })
  });

  it('should HAPPY PATH on request to /drills/:drill_id/events POST', (done) => {
    chai.request(server)
      .post('/api/drills/' + drillId + '/events')
      .send({ action_id: 'Missed FT'})
      .end((res) => {
        res.should.have.status(201)
        chai.request(server)
          .delete('/api/events/' + res.body.id)
          .end((respo) => {
            respo.should.have.status(204)
            done();
          })
      })
  });
});

describe('Organizations Tests', () => {
  it('should HAPPY PATH on request to /organizations/:organization_id/players GET', (done) => {
    chai.request(server)
      .get('/api/organizations/1/players')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
});

describe('Player Tests', () => {

  it('should HAPPY PATH on request to /organizations/:organization_id/players POST', (done) => {
    chai.request(server)
      .post('/api/organizations/1/players')
      .send({ jersey_number: 8})
      .end((res) => {
        res.should.have.status(201);
        chai.request(server)
          .delete('/api/players/' + res.body.id)
          .end((resp) => {
            resp.should.have.status(204)
            done();
          })
      })
  })

  it('should UPDATE on request to /players PUT', (done) => {
    chai.request(server)
      .post('/api/organizations/1/players')
      .send({ jersey_number: 8})
      .end((res) => {
        chai.request(server)
          .put('/api/players/' + res.body.id)
          .send({ jersey_number: 19})
          .end((resp) => {
            resp.should.have.status(202);
            chai.request(server)
              .delete('/api/players/' + res.body.id)
              .end((respo) => {
                respo.should.have.status(204)
                done();
              })
          })
      })
  })
})

describe('Teams test', () => {

  it('should HAPPY PATH on request to /teams POST', (done) => {
    chai.request(server)
      .post('/api/teams')
      .send({ player1_id: 3})
      .end((res) => {
        res.should.have.status(201);
        chai.request(server)
        .delete('/api/teams/' + res.body.id)
        .end(() => {
          done();
        })
      });
  })

  it('should ERROR on request to /teams POST when player ID invalid', (done) => {
    chai.request(server)
      .post('/api/teams')
      .send({ player1_id: 0})
      .end((res) => {
        res.should.have.status(400);
        done();
      })
  });
})
