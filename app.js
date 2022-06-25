const express = require('express');
const { ObjectId } = require('mongodb');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.use(express.json());

app.listen(process.env.PORT || 3000, () =>{
    console.log('server is running')
})

let uri = "mongodb+srv://zayya:1082018mgmg@cluster0.jlldo.mongodb.net/?retryWrites=true&w=majority"
let db;
MongoClient.connect(uri, (err, client) =>{
    if(err) throw err
    db = client.db('socialapp')
})

app.get('/users', (req, res) =>{
    db.collection('users').find().toArray((err, result) =>{
        if(err) throw err
        res.status(200).json(result);
    })
})

app.get('/users/:id', (req,res) =>{
    const userId = req.params.id;
    db.collection('users').findOne({_id: ObjectId(userId)})
    .then((result) =>{
        res.status(200).json(result);
    })
})

app.post('/users', (req,res) =>{
    const data = req.body;
    db.collection('users').insertOne(data)
    .then((result) =>{
        res.status(201).json(result);
    })
})