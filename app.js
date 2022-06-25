const express = require('express');
const app = express();

app.listen(process.env.PORT || 3000, () =>{
    console.log('server is running')
})

app.get('/', (req, res) =>{
    const data = [
        {name: "mgmg", gender:  "male"},
        {name: "mama", gender:  "female"},
    ];
    res.status(200).json(data);
})