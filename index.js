const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


const client = new MongoClient(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.efzq5bn.mongodb.net/?appName=Cluster0`
);
console.log(process.env.DB_USER, process.env.DB_PASS);

const farmItemsCollection = client
  .db("agroMela")
  .collection("farmItems");

  const ProductsCollection = client.db("agroMela").collection("products");
  const serviceCollection = client.db("agroMela").collection("services")

async function connectToMongoDB() {
  try {
    await client.connect();

    console.log("You successfully connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
}
// farmItems 
app.get("/farmItems", async (req, res) => {
  const result = await farmItemsCollection.find().toArray();
  res.send(result);
});
// products
app.get("/products", async(req, res)=>{
  const result = await ProductsCollection.find().toArray();
  res.send(result)
})
// service
app.get("/services", async (req, res)=>{
  const serviceResult = await serviceCollection.find().toArray();
  res.send(serviceResult);
})


app.get("/", (req, res) => {
  res.send("agro mele server is cooking");
});

connectToMongoDB();

app.listen(port, () => {
  console.log(`agro mela server listening on port ${port}`);
});