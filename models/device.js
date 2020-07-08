const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
    name: { type: String, require: true },
    owner: { type: String, require: true },
    done: { type: Boolean, require: true, default: false }
});

const Device = mongoose.model('Device', DeviceSchema);

module.exports = Device; 