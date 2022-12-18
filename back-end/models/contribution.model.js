const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const contributionSchema = new Schema({
    animal: String,
    name: String,
    group: String,
    description: String,
    links: [{
        types: String,
        url: String
    }],
    level: Number,
    expert: String,
    approved: {
        type: Boolean,
        default: false
    }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.contribution, contributionSchema);