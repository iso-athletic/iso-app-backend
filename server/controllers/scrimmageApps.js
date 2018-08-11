// not sure if this is how we want to do this data, but im mocking it for now
const ScrimmageApp = require('../models').ScrimmageApp;

module.exports = {
  create(req, res) {
    return ScrimmageApp 
      .create({
        type: req.body.type,
        timer_duration: req.params.timer_duration,
        team_roster: req.params.team_roster,
        actions: req.params.actions,
      })
      .then(scrimmageApp => res.status(201).send(scrimmageApp))
      .catch(error => res.status(400).send(error));
  },
  read(req, res) {
    console.log(req.body)
    res.status(200).send("success: " + req.body.team);
  }
};