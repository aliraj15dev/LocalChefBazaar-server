const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

//? Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.7suxelv.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.send("LocalChefBazaar Server is Working");
});

async function run() {
  try {
    await client.connect();

    const myDB = client.db("LocalChefBazaar");
    const dailyMeals = myDB.collection("DailyMeals");
    const reviews = myDB.collection("reviews");

    app.get('/dailymeals', async(req, res)=>{
        const cursor = dailyMeals.find()
        const result = await cursor.toArray()
        res.send(result)
    })
    app.get('/dailymeals/:id', async(req, res)=>{
        const {id} = req.params
        const query = {_id: new ObjectId(id)}
        const result = await dailyMeals.findOne(query)
        res.send(result)
    })

    app.get('/reviews', async(req, res)=>{
        const cursor = reviews.find()
        const result = await cursor.limit(6).toArray()
        res.send(result)
    })








    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server in running on port: ${port}`);
});
