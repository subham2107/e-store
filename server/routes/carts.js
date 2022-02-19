const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Product = require('../models/product');

router.get('/me', (req,res) => {
    Cart.find({_id: req.session.cartId})
    .then(cartProducts => {
        if(cartProducts.length !== 0) {
            res.status(200).send(cartProducts);
        }
        else {
            res.status(404).send({cartProducts, error: "No cart products"})
        }
    })
    .catch(()=>{
        res.status(500).send({error: "Internal Server Error"});
    });
});

router.post('/:productId', (req, res) => {
    Product.find({ _id: (req.params.productId) }).then(product => {
        
        Cart.find({_id: req.session.cartId})
        .then(cartProduct => {
           

            if(cartProduct.length !== 0) {
                
                const cartProductIdIndex = cartProduct[0].productList.findIndex((a) => a.productId == req.params.productId);
                
                if(cartProductIdIndex === -1) {
                    
                    // cart does not have this product yet 
                    cartProduct[0].productList.push({
                        productId: req.params.productId,
                        title: product[0].title,
                        oneProductPrice: product[0].price,
                        quantityPrice: product[0].price,
                        cartQuantity: 1,
                        description: product[0].description,
                        category: product[0].category,
                        image: product[0].image,
                        rating: {
                            rate: product[0].rating.rate,
                            count: product[0].rating.count
                        }
                    })
                    
                    cartProduct[0].totalCartPrice = cartProduct[0].totalCartPrice + product[0].price;
                    
                    cartProduct[0].save()
                    .then(()=>{
                        res.status(201).send({cartProduct, message: "New product added in cart"});

                    })
                }
                else {

                    res.status(201).send({cartProduct, message: "Product already in cart"});
                    // cart already has this product
                    // const itemInProductList = cartProduct.productList[cartProductIdIndex]
                    // itemInProductList.cartQuantity++;
                    // itemInProductList.quantityPrice = (itemInProductList.cartQuantity * itemInProductList.oneProductPrice);
                    // cartProduct.totalCartPrice = cartProduct.totalCartPrice + itemInProductList.quantityPrice;
                    // cartProduct.save()
                    // .then(()=>{
                    //      res.status(201).send({cartProduct, message: "Product quantity updated in cart"});

                    // })

                }
            } 
            else {
                
                // cart is being created 1st time (so new cartId is added to session)
                const freshCart = new Cart({
                    productList : {
                        productId: req.params.productId,
                        title: product[0].title,
                        oneProductPrice: product[0].price,
                        quantityPrice: product[0].price,
                        cartQuantity: 1,
                        description: product[0].description,
                        category: product[0].category,
                        image: product[0].image,
                        rating: {
                            rate: product[0].rating.rate,
                            count: product[0].rating.count
                        }
                    },
                    totalCartPrice: product[0].price
                })  
                

                freshCart.save()
                .then((newCartProduct)=>{
                    req.session.cartId = newCartProduct._id;
                    res.status(201).send({freshCart, message: "Product added in fresh cart"});
                })
                
            }
        })
        .catch(()=>{
            res.status(500).send({error: "Internal server error1"})
        })
    })
    .catch(()=>{
        res.status(500).send({error: "Internal server error2"})
    })
})
 

router.get('/count', (req,res) => {
    Cart.find({_id: req.session.cartId})
    .then(cartItems=>{
        if(cartItems) {
            //cart created and it has product in it
            if(cartItems.length !== 0) {
                res.status(200).send({cartProductCount: cartItems[0].productList.length})              
            }
            else {
                //cart is created, still no product in it
                res.status(200).send({cartProductCount: 0})
            }
        }
        else {
            //cart not created
            res.status(200).send({cartProductCount: 0})
        }
    })
    .catch(()=>{
        res.status(500).send({error: "Internal Server Error"});
    });

})

router.delete('/:productId', (req,res)=>{
    Cart.find({_id: req.session.cartId})
    .then((cartItem)=>{
        
        const cartProductIdIndex = cartItem[0].productList.findIndex((a) => a.productId == req.params.productId);
        
        cartItem[0].totalCartPrice = cartItem[0].totalCartPrice - cartItem[0].productList[cartProductIdIndex].quantityPrice
        
        cartItem[0].productList.splice(cartProductIdIndex, 1);
        
        cartItem[0].save()
        .then(()=>{
            res.status(204).send({cartItem, message: "Product deleted from cart"});
        })
    })
    .catch(()=>{
        res.status(500).send({error: "Internal Server Error"});
    });

})

router.post('/:productId/increaseCount', (req,res)=>{
    Cart.find({_id: req.session.cartId})
    .then((cartProduct)=>{
        const cartProductIdIndex = cartProduct[0].productList.findIndex((a) => a.productId == req.params.productId);
        const itemInProductList = cartProduct[0].productList[cartProductIdIndex]
        itemInProductList.cartQuantity++;
        itemInProductList.quantityPrice = (itemInProductList.cartQuantity * itemInProductList.oneProductPrice);
        cartProduct[0].totalCartPrice = cartProduct[0].totalCartPrice + itemInProductList.oneProductPrice;
        cartProduct[0].save()
        .then(()=>{
            res.status(201).send({cartProduct, message: "Product quantity increased in cart"});

        })
    })
    .catch(()=>{
        res.status(500).send({error: "Internal Server Error"});
    });
})

router.post('/:productId/decreaseCount', (req,res)=>{
    Cart.find({_id: req.session.cartId})
    .then((cartProduct)=>{
        const cartProductIdIndex = cartProduct[0].productList.findIndex((a) => a.productId == req.params.productId);
        const itemInProductList = cartProduct[0].productList[cartProductIdIndex]
        if(itemInProductList.cartQuantity == 1) {
            res.status(200).send({cartProduct, message: "Quantity cannot be less than 1"});
        }
        else {
            itemInProductList.cartQuantity--;
            itemInProductList.quantityPrice = (itemInProductList.cartQuantity * itemInProductList.oneProductPrice);
            cartProduct[0].totalCartPrice = cartProduct[0].totalCartPrice - itemInProductList.oneProductPrice;
            cartProduct[0].save()
            .then(()=>{
                res.status(201).send({cartProduct, message: "Product quantity decreased in cart"});

            })
        }
        
    })
    .catch(()=>{
        res.status(500).send({error: "Internal Server Error"});
    });
})


module.exports = router;