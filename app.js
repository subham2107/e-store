const express = require('express');
const axios = require('axios');
const path = require('path');
var genuuid = require('uuid').v4;
const session = require('express-session');
const MongoStore = require('connect-mongo');
const Product = require('./server/models/product');

const app = express();

const api = require('./server/api');
const db = require('./server/db');

//Configure .env
require('dotenv').config();

//Set port as process.env.PORT if it is present otherwise set it to 4000
const port = process.env.PORT || 4000;

//Initiate connection with database
db.connect({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}).then(() => {
    //Handle /api with the api middleware
    app.use('/api', session({
        genid() {
            return genuuid() // use UUIDs for session IDs
        },
        store: new MongoStore({ client: db.getClient() }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    }), api);

    //Handle non-api routes with static build folder
    app.use(express.static(path.join(__dirname, 'build')));

    //Return index.html for routes not handled by build folder
    app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });


    // axios('https://fakestoreapi.com/products')
    // .then(response=>{
    //     //console.log(response.data)
    //         for(let i=0;i<response.data.length;i++) {
    //         const product = new Product({
    //             _id: response.data[i].id,
    //             title: response.data[i].title,
    //             price: Math.round(response.data[i].price * 76),
    //             quantity: 1000,
    //             description: response.data[i].description,
    //             category: response.data[i].category,
    //             image: response.data[i].image,
    //             rating: response.data[i].rating,
    //           });
              
              
              
    //           product.save()
    //           .then(savedDoc => {
    //               console.log(`Saved with id: ${savedDoc.id}`);
    //           }, err => {
    //               console.log(`Error in saving product ${err}`);
    //           });
    
    //     }
        
    // });

    //Start listening on port
    app.listen(port, () => {
        console.log(`Server listening at port: ${port}`);
    });
});