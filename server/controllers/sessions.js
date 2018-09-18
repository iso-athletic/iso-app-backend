const Session = require('../models').Session;

module.exports = {
  create(req, res) {
    return Session
      .create({
        start_time: req.body.start_time,
        organization_id: req.body.organization_id
      })
      .then(session => res.status(201).send(session))
      .catch(error => res.status(400).send(error));
  },

  getAll(req, res) {
    return Session
      .all( {
        where: {
          start_time: {
            $ne: null,
          },
          end_time: {
            $ne: null,
          },
        }
      })
      .then(session => res.status(200).send(session))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Session.update({
      end_time: req.body.end_time
    },{ returning: true, where: {id: req.params.session_id} }
    )
    .then(sessions => res.status(202).send(sessions))
    .catch(error => res.status(400).send(error));
  },
  delete(req, res) {
    Session.destroy({
      where: { id: req.params.session_id }
    })
    .then(sessions => res.status(204).send(sessions.id))
    .catch(error => res.status(400).send(error));
  }
};
