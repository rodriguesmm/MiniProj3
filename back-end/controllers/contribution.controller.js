const Expert = require('../models/contribution.model');
const {
    validationResult
} = require('express-validator');
const AnimalMessages = require("../messages/animal.messages");

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Expert({
        animal: req.params.id,
        name: req.body.name,
        group: req.body.group,
        description: req.body.description,
        level: req.body.level,
        links: req.body.links,
        expert: req.body.expert
    }).save((error, animal) => {
        if (error) throw error;
        let message = AnimalMessages.success.s0;
        message.body = animal;
        return res.header("location", "/expert/animals/" + animal._id).status(message.http).send(message);
    });
}