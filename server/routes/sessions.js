const express = require('express');
const router = express.Router();
const UserCredential = require('../models/user-credential');
const bcrypt = require('bcryptjs');

router.post('/', (req, res) => {
    if (!req.body) {
        res.status(400).send({error: "Please enter details"});
        return;
    }

    const { email, userName, password } = req.body;

    if (!email) {
        res.status(400).send({error: "Please enter email"});
        return;
    }

    if (!userName) {
        res.status(400).send({error: "Please enter username"});
        return;
    }

    if (!password) {
        res.status(400).send({error: "Please enter password"});
        return;
    }

    UserCredential.findOne({ email }).then(user => {
        if (!user) {
            res.status(400).send({error: "User not signed up"});
            return;
        }

        const match = bcrypt.compareSync(password, user.password);

        if (!match) {
            res.status(400).send({error: "Incorrect email or password"});
            return;
        }

        req.session.userId = user.id;
        res.status(204).send();
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});

router.delete('/me', (req, res) => {
    delete req.session.userId;
    res.status(204).send();
});

module.exports = router;