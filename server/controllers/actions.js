const Action = require('../models').Action;

// we'll probably want to cache information like this
// since it won't change that much session to session

module.exports = {
  GetAll(req, res) {
    return Action
      .findAll({attributes: ['type']})
      .then(action => res.status(200).send(action))
      .catch(error => {
        res.status(400).send(error)
        console.log('error');
      });
  },
  NewAction(req, res) {
    let newActionType = req.body.type;
    return Action
      .findAll({attributes: ['type']})
      .then(allActions => {
        // check to make sure action doesn't already exist in the db
        if (allActions.includes(newActionType)) {
          // 409 status code: conflict with current state
          // feel free to change if there's a more relavent one
          res.status(409).send("Action type: " + newActionType + " already exists")
        } else {
          Action
            .build({type: newActionType})
            .save()
            .then(res.status(200).send('Action type: ' + newActionType + ' successfully added'))
            .catch(error => res.status(400).send(error));
        }
      })
      .catch(error => res.status(400).send(error));
  }
}