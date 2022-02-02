const express = require('express');
const router = express.Router();
const Product = require('../models/product');


router.get('/', (req,res) => {
    Product.find().then(product => {
        res.send(product);
    }).catch(() => {
        res.status(500).send({error: "Internal Server Error"});
    });
});


module.exports = router;


