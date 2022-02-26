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

router.get('/sort', (req,res) => {
    Product.find().then(product => {
        res.send(product.sort());
    })
    .catch(()=>{
        res.status(500).send({error: "Internal Server Error"});
    });
});

router.get('/:productId', (req,res) => {
    Product.find({_id: req.params.productId})
    .then(product => {
        res.send(product);
    })
    .catch(()=>{
        res.status(500).send({error: "Internal Server Error"});
    });
});

router.get('/category/:categoryName', (req,res) => {
    Product.find({category: req.params.categoryName})
    .then(products => {
        if(!products) {
            res.send(404).send();
        }
        res.send(products);
    })
    .catch(()=> {
        res.status.send(500).send({error: "internal Server Error"});
    });
});


module.exports = router;


