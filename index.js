const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;
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
            .then(result => {
                res.send(result.insertedCount > 0);
            })
        console.log(newRegistration);
    })


    app.get('/registrations', (req, res) => {
        if (req.query.email) {
            registrations.find({ email: req.query.email })
                .toArray((err, documents) => {
                    res.send(documents);
                })
        }
        else {
            registrations.find({})
                .toArray((err, documents) => {
                    res.send(documents);
                })
        }
    })


    app.delete('/registrations/delete/:id', (req, res) => {
        registrations.deleteOne({ _id: ObjectId(req.params.id) })
            .then((result) => {
                console.log(result);
                res.send(result.deletedCount > 0);
            })
    })

});



app.listen(process.env.PORT || port)