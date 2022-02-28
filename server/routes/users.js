const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const UserCredential = require('../models/user-credential');
const User = require('../models/user');
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
        if (user) {
            res.status(400).send({error: "User already signed up"});
            return;
        }

        const hash = bcrypt.hashSync(password);

        const userCredential = new UserCredential({ email, password: hash });

        userCredential.save().then(() => {
            const user = new User({ _id: userCredential.id, email, userName });
            user.save().then(() => {
                res.status(201).send({ id: userCredential.id });
            });
        });
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});

router.get('/me', auth.authenticate, (req, res) => {
    User.findOne({ _id: req.session.userId }).then(user => {
        res.send(user);
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});

router.get('/:userId', (req, res) => {
    User.findOne({ _id: req.params.userId }).then(user => {
        res.send(user);
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});

// router.put('/me', auth.authenticate, (req, res) => {
//     if (!req.session.userId) {
//         res.send(401).send({ error: "Not logged in"});
//     }

//     const { cityName, pincode, stateName } = req.body;
//     console.log(req.body)

//     const updateQuery = {};
//     (cityName !== undefined) && (updateQuery.address.cityName = cityName);
//     (pincode !== undefined) && (updateQuery.address.pincode = pincode);
//     (stateName!== undefined) && (updateQuery.address.stateName = stateName);

//     console.log(updateQuery)
    
//     console.log('hi inside put')
//     User.updateOne({ _id: req.session.userId }, updateQuery).then(() => {
//         res.status(204).send();
//     }).catch(() => {
//         res.status(500).send({ error: "Internal Server Error" });
//     });
// });

router.post('/address', auth.authenticate, (req,res) => {
    const userId = req.session.userId;
    const { cityName, pincode, stateName } = req.body;
    User.find({_id: userId})
    .then(user => {
        res.status(201).send()
    })
    .catch(()=>{
        res.status(500).send({error: "Internal Server Error"})
    })
})

module.exports = router;