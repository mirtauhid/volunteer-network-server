const express = require('express')
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;


const app = express()
const port = 5000



const uri = "mongodb+srv://DB_USER:DB_PASS@cluster0.ey4wq.mongodb.net/DB_NAME?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("volunteer-network-server").collection("vn.user");
    console.log("database connected");
    
});




app.get('/', (req, res) => {
    res.send('Hello World!')
})



app.listen(port);