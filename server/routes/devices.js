const express = require('express');
const router = express.Router();
const Device = require('../models/device')

// Getting All
router.get('/', async (req, res) => {
    try {
        const devices = await Device.find();
        res.json(devices);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
});

// Getting One
router.get('/:hostname', getDevice, async (req, res) => {
    res.json(res.device);
});

// Creating One
router.post('/', async (req, res) => {
    const { hostname, ip } = req.body;
    const existingDevice = await Device.findOne({ hostname });
    if (existingDevice) {
        return res.status(409).json({ message: 'Device already exists' });
    };

    const device = new Device({
        hostname: req.body.hostname,
        ip: req.body.ip,
        status: req.body.status
    })
    try {
        const newDevice = await device.save();
        res.status(200).json(newDevice);
    } catch (err) {
        res.status(400).json({ message: err.message });
    };
});

// Updating One
router.patch('/:hostname', getDevice, async (req, res) => {
    if (req.body.ip != null) {
        res.device.ip = req.body.ip;
    } else if (req.body.status != null) {
        res.device.status = req.body.status;
    };
    try {
        const updatedDevice = await res.device.save();
        res.json(updatedDevice);
    } catch (err) {
        res.status(400).json({ message: err.message });
    };
});

// Deleting One
router.delete('/:hostname', getDevice, async (req, res) => {
    try {
        await Device.deleteOne({ hostname: res.device.hostname });
        res.json({ message: 'Device removed from the list'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    };
});

async function getDevice (req, res, next) {
    let device;
    try {
        device = await Device.findOne({ hostname: req.params.hostname });
        if (device == null) {
            return res.status(404).json({ message: 'Cannot find the device' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.device = device;
    next();
};

module.exports = router

