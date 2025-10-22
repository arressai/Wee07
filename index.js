//let express = require('express');
//require vs import

//DB = 0 - install and load lowdb
import express from 'express';
import {Low} from 'lowdb';
import {JSONFile} from 'lowdb/node';
import bodyParser from 'body-parser';

let app = express();

//DB = 1 - connect to lowdb
const defaultData = { ingredientsTracker: [] };
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);

//DB = 3 - fetch values from the DB (initialize the database)
await db.read();

// Force initial write to create the file
await db.write();
console.log('Database initialized');

//to parse JSON bodies
app.use(bodyParser.json());

// app.get('/', (req,res)=> {
//     res.send ('this is the main page');
// })       

//add a route on our server that is listening for a POST request
app.post('/ingredients', (req,res)=> {
    console.log(req.body);
    let currentDate = Date();
    let obj = {
        date: currentDate,
        ingredients: req.body.ingredients
    }

    ingredientsTracker.push(obj);
    console.log(ingredientsTracker);
    res.json({task:"success"}); });

//add route for noDogs
app.post('/noDogs', async (req,res)=> {
    console.log('=== POST REQUEST RECEIVED ===');
    let currentDate = new Date().toISOString();
    console.log('Request received at:', currentDate);
    console.log('Received hotdog data:', req.body);
    console.log('Hotdog ingredients:', req.body.hotdogIngredients);
    
    // Store in database with date
    let obj = {
        date: currentDate,
        hotdogIngredients: req.body.hotdogIngredients
    };
    
    //DB = 2 - add value to the DB
    db.data.ingredientsTracker.push(obj);
    await db.write();
    
    console.log('Data saved to database');
    console.log('=== END OF REQUEST ===');
    res.json({task:"success", message:"Hotdog ingredients received!"}); });

//add a route to get all the ingredients tracked so far
app.get('/all-ingredients', async (req,res)=> {
    await db.read(); // Read latest data from file
 let obj = {data: db.data.ingredientsTracker};
 res.json(obj);  
});

app.use('/', express.static('public'));
app.listen(3000, ()=> {
    console.log('listening at localhost:3000');
})
 