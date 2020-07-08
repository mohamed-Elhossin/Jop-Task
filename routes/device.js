const express = require('express');
const router = express.Router();
const Device = require("../models/device")
const passport = require('passport');

router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    let Device
     = new Device({
        name: req.body.name,
        owner: req.body.owner,
        done: req.body.done,
    })

    Device.save((err, tasl) => {
        if (err) {
            return res.send({
                sccess: false,
                message: "ERROR tru agin",
            });

        }
        if (!Device) {
            return res.send({
                sccess: false,
                message: "ERROR saved Device",
            });
        }

        return res.send({
            success: true,
            message: "Device saved",
            Device
        });
    });
})
router.post('/list', passport.authenticate('jwt', { session: false }), (req, res) => {
    const owner = req.body.owner;
    Device.find({ owner }, (err, Device) => {
        if (err) {
            return res.send({
                success: false,
                message: "ERROR list Device",
            });
        }
        if (!Device) {
            return res.send({
                success: false,
                message: "ERROR non found Device",
            });
        }

        return res.send({
            success: true,
            Device
        });

    });
});
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const DeviceID = req.params.id;
    Device.remove({ _id: DeviceID }, (err) => {
        if (err) {
            return res.send({
                success: false,
                message: "ERROR on delete Device"
            });
        }
        return res.send({
            success: true,
            message: "Device deleted"
        });
    })


})




module.exports = router; 