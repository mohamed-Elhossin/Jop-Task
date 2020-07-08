const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// get all users
router.get('/', async (req, res) => {
    const user = await User.find();
    res.send(user)
});

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).send("Employee not exist at system ");
    }else{
    res.send({ user: user })}
});

router.post('/auth', async (req, res) => {

    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('incalid email try agin');

    let validPass = await bcrypt.compare(req.body.password, user.password);
    if (validPass) return res.status(400).send('invalid password');

    const ONE_WEEK = 604800;
    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: ONE_WEEK });

    let returnUser = {
        name: user.name,
        email: user.email,
        id: user._id,
        token
    }
    res.send({
        Succesed: true,
        message: "you can login now",
        user: returnUser
    });
});

router.post('/' , (req, res, next) => {
console.log(req.file);
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save((err, user) => {
        if (err) {
            return res.send({
                Succesed: false,
                message: "Failed to save user "
            });
        }
        res.send({
            Succesed: true,
            message: "User saved",
            user
        });
    });



});



module.exports = router;