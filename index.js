const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;


// middleware

app.use(cors());
app.use(express.json())

console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kmvb6d0.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// homeservice



// ******services

async function run() {
    try {
        const serviceCollection = client.db('foodService').collection('services')

        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query)

            const services = await cursor.toArray();

            res.send(services)
        })


        const serviceCollections = client.db('foodService').collection('services')

        app.get('/homeservices', async (req, res) => {
            const query = {}
            const cursor = serviceCollections.find(query).limit(3)

            const services = await cursor.toArray();


            res.send(services)
        })





    }

    finally {

    }


}

run().catch(err => console.error(err));







app.get('/', (req, res) => {
    res.send('food services is running')
})

app.listen(port, () => {
    console.log(`fodd services is running on ${port}`);
})

