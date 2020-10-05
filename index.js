const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()


const port = 5000


const app = express()


app.use(cors());
app.use(bodyParser.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ey4wq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log(err);
    const registrations = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COL_USER_EVENT}`);
    console.log("db connected successfully");



    app.post('/addRegistration', (req, res) => {
        const newRegistration = req.body;
        registrations.insertOne(newRegistration)
            .then(res => {
                console.log({res});
            })
        console.log(newRegistration);
    })
});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port)