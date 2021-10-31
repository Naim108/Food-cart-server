const express=require('express')
const { MongoClient } = require('mongodb');
const ObjectId=require('mongodb').ObjectId;
const app=express();
const cors=require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000;
// middleware
app.use(cors())
app.use(express.json())
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.frk7m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        const database=client.db('productsItem')
        const productsCollection=database.collection('products')
        const ordersCollection=database.collection('orders')
        // add product to mongodb
        app.post('/addProduct',async(req,res)=>{
            const result=await productsCollection.insertOne(req.body)
             .then(result=>{
                 res.json(result.insertedId)
             })
         })
        //  add order to orders database
        app.post('/products/:id',async(req,res)=>{
            const result=await ordersCollection.insertOne(req.body)
             .then(result=>{
                //  console.log(result)
                 res.send(result.insertedId)
             })
         })

            //   get all products to array
    app.get('/products',async(req,res)=>{
        const result=await productsCollection.find({}).toArray();
        res.send(result)
       
    })
            //   get own  orders from array
    app.get('/myOrders/',async(req,res)=>{
        const result=await ordersCollection.find({}).toArray();
        res.send(result)

       
    })
            //   manage all orders from array
    app.get('/manageOrder',async(req,res)=>{
        const result=await ordersCollection.find({}).toArray();
        res.send(result)
       
    })
            // get product details
            app.get('/products/:id',async(req,res)=>{
                const id=req.params.id;
                const query={_id: ObjectId(id)}
                const product=await productsCollection.findOne(query)
                res.json(product)
    
            })
                    // delete order from manage order
        app.delete('/manageOrder/:id',async(req,res)=>{
            const id=req.params.id;
            const query={_id: ObjectId(id)}
            const result=await ordersCollection.deleteOne(query);
            res.json(result)
        })

      

    }
    finally{
        // await client.close();
    }

}
run().catch(console.dir)






app.get('/',(req,res)=>{
    res.send('Food service server is running')
})

app.listen(port,()=>{
    console.log('Server is running',port)
})