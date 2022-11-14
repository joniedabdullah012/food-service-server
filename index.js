const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;


// middleware

app.use(cors());
app.use(express.json());

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
        const reviewCollection = client.db('foodService').collection('reviews')
        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query)

            const services = await cursor.toArray();

            res.send(services)
        });



        // const serviceCollections = client.db('foodService').collection('services')

        app.get('/homeservices', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query).limit(3)

            const services = await cursor.toArray();


            res.send(services)
        });


        app.get('/homeservices/:id', async (req, res) => {

            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service)




        })
        app.get('/services/:id', async (req, res) => {

            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service)




        });

        // review api****

        app.get('/myreviews', async (req, res) => {
            console.log(req.query.email);
            let query = {};

            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = reviewCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);




        });
        app.get('/myreviews', async (req, res) => {
            const query = {}
            const cursor = reviewCollection.find(query)

            const orders = await cursor.toArray();


            res.send(orders)
        });

        app.post('/reviews', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);


        });

        app.patch('/myreviews/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body.status
            const query = { _id: ObjectId(id) };
            const updatedDoc = {
                $set: {
                    status: status
                }


            }
            const result = await reviewCollection.updateOne(query, updatedDoc)
            res.send(result)




        })









        app.delete('/myreviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await reviewCollection.deleteOne(query);
            res.send(result)


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

