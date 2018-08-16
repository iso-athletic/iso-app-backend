const Team = require('../models').Team;

module.exports = {
    create(req, res) {
        return Team
            .create({
                name: req.body.name,
                player1_id: req.body.player1_id,
                player2_id: req.body.player2_id,
                player3_id: req.body.player3_id,
                player4_id: req.body.player4_id,
                player5_id: req.body.player5_id,
                drill_id: req.body.drill_id
            })
            .then(team => res.status(201).send(team))
            .catch(error => res.status(400).send(error));
    }
};