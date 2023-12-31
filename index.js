const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.port || 5000;




// middleware

app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173"]
}));
app.use(express.json());



// bUQPNGsSKdWgIQPs
// accommodation 



const uri = "mongodb+srv://accommodation:bUQPNGsSKdWgIQPs@cluster0.xl4aigt.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // await client.connect();



        const roomCollection = client.db('roomDB').collection('rooms');
        const orderCollection = client.db('roomDB').collection('booked');
        const bannerCollection = client.db('roomDB').collection('banner')

        // app.get('/data/:id', async (req, res) => {
        //     const id = req.params.id;
        //     console.log('req for this brand product: ', id);
        //     const query = { _id: new ObjectId(id) };
        //     const result = await dataCollection.findOne(query)
        //     res.send(result)
        // })
        app.get("/bookingForm/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const options = {
                projection: { Title: 1, Price: 1, Size: 1 },
            };
            const result = await roomCollection.findOne(query, options)
            res.send(result)
            console.log(result);
        })

        // get booked room data

        app.get('/booked', async (req, res) => {
            console.log(req.query.Email);
            let query = {};
            if (req.query?.Email) {
                query = { Email: req.query.Email }
            }
            const result = await orderCollection.find(query).toArray();
            res.send(result)
        })


        // booked
        app.post('/booked', async (req, res) => {
            const booked = (req.body);
            console.log(booked);
            const result = await orderCollection.insertOne(booked);
            res.send(result)
        })
        app.delete('/booked/:id', async (req, res) => {
            const id = req.params.id;

            const query = { _id: new ObjectId(id) }
            const result = await orderCollection.deleteOne(query);
            if (result.deletedCount === 1) {
                res.json({ success: true, message: 'Item deleted' }); // Fixed typo: 'message' instead of 'massage'
            } else {
                res.json({ success: false, message: 'Item not found or not deleted' });
            }
        });




        app.get('/roomDetails/:id', async (req, res) => {
            const id = req.params.id;
            console.log('req for id', id);
            const query = { _id: new ObjectId(id) };
            const result = await roomCollection.findOne(query);
            // console.log(result);
            res.send(result)
        })




        app.get('/room', async (req, res) => {
            const cursor = roomCollection.find();
            const result = await cursor.toArray();
            console.log(result);
            res.send(result)
            // console.log(result);
        })

        app.post('/room', async (req, res) => {
            const newRoom = req.body;
            const result = await roomCollection.insertOne(newRoom);
            res.send(result);
            // console.log(result);
        })

        app.get('/homeBanner', async (req, res) => {
            const cursor = bannerCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })

        app.post('/homeBanner', async (req, res) => {
            const newBanner = req.body;
            const result = await bannerCollection.insertOne(newBanner);
            res.send(result);
            // console.log(result);
        })


        // Connect the client to the server	(optional starting in v4.7)
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();    
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('assignment-0004 is running')

})
app.listen(port, () => {
    console.log(`assignment server is running on port ${port}`);
})


