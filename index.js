const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

//const port =6060
const port = process.env.PORT || 6060;
console.log(process.env.DB_Name)
app.use(cors());
app.use(bodyParser.json());

const uri = `mongodb+srv://online-shopping-project:test1234@cluster0.vxjbg.mongodb.net/onlineShopping?retryWrites=true&w=majority`

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
res.send('Hello World! im m a  hossain')
})





client.connect(err => {
  console.log('connection error',err)
  const productCollection = client.db("onlineShopping").collection("products");
  const orderCollection = client.db("onlineShopping").collection("orders");
  console.log('database connection success now')

  app.get('/products',(req,res)=>{
    productCollection.find()
    .toArray((err,item)=>{
        console.log('from database',item)
        res.send(item)
    })
})

app.get('/orders',(req,res)=>{
  orderCollection.find({email:req.query.email})
  .toArray()
  .then(result =>res.json(result))
})



  app.post('/addProducts', (req, res) => {
    const newProduct = req.body;
    console.log('adding new product: ', newProduct)
    productCollection.insertOne(newProduct)
    .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
        res.redirect('/admin')
    })
  }) 

 
  app.delete('/delete/:id',(req,res)=>{
    const {id} = req.params
    //console.log(req.params.id)
    productCollection.deleteOne({_id: ObjectId(id)})
    .then(result =>{
     res.send(result.deletedCount >0)
    })
  })
 
 
  app.post('/addOrder', (req, res) => {
    const newOrder = req.body;
    console.log('adding new product: ', newOrder)
    orderCollection.insertOne(newOrder)
    .then(result => {
        console.log('inserted count', result.insertedCount);
       // res.send(result.insertedCount > 0)
    })
  }) 
  


});
app.get('/', (req, res) => {
  res.send('Hello this is for project 10')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})






/* const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://<username>:<password>@cluster0.vxjbg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
 */