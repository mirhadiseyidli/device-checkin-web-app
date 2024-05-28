const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    hostname: {
        type: String,
        require: true
    },
    ip: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: false
    },
    lastUpdated: {
        type: Date,
        require: false,
        default: Date.now
    }
});

deviceSchema.pre('save', function(next) {
    this.lastUpdated = Date.now();
    next();
});

module.exports = mongoose.model('Device', deviceSchema);