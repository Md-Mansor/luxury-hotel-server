const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.port || 5000;




// middleware

app.use(cors());
app.use(express());



// JakXe0abH1YQK2No
// accommodation 



const uri = "mongodb+srv://accommodation:JakXe0abH1YQK2No@cluster0.wyk3bvm.mongodb.net/?retryWrites=true&w=majority";

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
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);












app.get('/', (req, res) => {
    res.send('assignment-0004 is running  ')

})
app.listen(port, () => {
    console.log(`assignment server is running on port ${port}`);
})


