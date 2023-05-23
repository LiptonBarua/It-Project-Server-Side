const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app= express();
const port = process.env.PORT || 5000;


require('dotenv').config()

app.use(cors())
app.use(express.json())


app.get('/', (req, res)=>{
  res.send('It Project Run in Browser')
})




const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.l1pkovt.mongodb.net/?retryWrites=true&w=majority`;

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
    // await client.connect();

    const usersCollection=client.db('itSolutionsData').collection('users')


    // ................User Collection.................

    app.post('/users', async(req, res)=>{
      const user=req.body;
      const result =await usersCollection.insertOne(user);
      res.send(result)
    })


    app.get('/users', async(req, res)=>{
      const query={};
      const result= await usersCollection.find(query).toArray();
      res.send(result)
    })
    app.get('/profile', async(req, res)=>{
      let query={};
      if(req.query.email){
        query= {
          email:req.query.email
        }
      }
      const result= await usersCollection.find(query).toArray();
      res.send(result)
    })
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(error=>console.error(error));




app.listen(port, (req, res)=>{
    console.log('it project run in cmd')
})