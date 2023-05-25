const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


require('dotenv').config()

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.send('It Project Run in Browser')
})




const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.l1pkovt.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {


    const usersCollection = client.db('itSolutionsData').collection('users')
    const informationCollection = client.db('itSolutionsData').collection('personalInformation')
    const licenseMemberCollection = client.db('itSolutionsData').collection('licenseMember')


    // ................User Collection.................

    app.post('/users', async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result)
    })


    app.get('/users', async (req, res) => {
      const query = {};
      const result = await usersCollection.find(query).toArray();
      res.send(result)
    })

    app.put('/profile', async (req, res) => {
      const userProfile = req.query.email;
      const file = req.body;
      const { firstName, lastName, email, phone, image, location } = file;
      const filter = { email: userProfile };
      const option = { upsert: true };
      const updatedDoc = {
        $set: {
          firstName, lastName, email, phone, image, location
        }
      }

      const result = await usersCollection.updateOne(filter, updatedDoc, option)
      res.send(result)
    })


    app.get('/profile', async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = {
          email: req.query.email
        }
      }
      const result = await usersCollection.find(query).toArray();
      res.send(result)
    })


    // ...................Personal Information.............

    app.post('/information', async (req, res) => {
      const query = req.body;
      const result = await informationCollection.insertOne(query)
      res.send(result)
    })


    app.get('/information', async (req, res) => {
      const query = {};
      const result = await informationCollection.find(query).toArray();
      res.send(result)
    })


    //  ....................Personal License Members.....................

    app.post('/licensemember', async (req, res) => {
      const query = req.body;
      const result = await licenseMemberCollection.insertOne(query)
      res.send(result)
    })

    app.get('/licensemember', async (req, res) => {
      const query = {};
      const result = await licenseMemberCollection.find(query).toArray();
      res.send(result)
    })
  } finally {

  }
}
run().catch(error => console.error(error));




app.listen(port, (req, res) => {
  console.log('it project run in cmd')
})