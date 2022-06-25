const express = require('express');
const { ObjectId } = require('mongodb');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.use(express.json());
app.use(cors({
    "origin": "*"
}));

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

app.patch('/users/:id/:method', (req, res) =>{
    const method = req.params.method;
    const userId = req.params.id;
    const data = req.body;
    if("push" === method){
        db.collection('users').updateOne({_id: ObjectId(userId)}, {$addToSet: {comment: data}})
        .then((result) =>{
            res.status(201).json(result)
        })
    } else if("pull" === method){
        db.collection('users').updateOne({_id: ObjectId(userId)}, {$pull: {comment: data}})
        .then((result) =>{
            res.status(201).json(result)
        })
    }
})

// for menu collection

app.get('/menu', (req, res) =>{
    db.collection('menu').find().toArray((err, result) =>{
        if(err) throw err
        res.status(200).json(result);
    })
})

app.get('/menu/:id', (req, res) =>{
    const data = req.params.id;
    db.collection('menu').findOne({_id: ObjectId(data)})
    .then((result) =>{
        res.status(200).json(result);
    })
})

app.post('/menu', (req,res) =>{
    const data = req.body;
    db.collection('menu').insertOne(data)
    .then((result) =>{
        res.status(201).json(result);
    })
})



