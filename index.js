const express=require('express')
const { MongoClient } = require('mongodb');
const app=express();
const cors=require('cors')
require('dotenv').config()
const port=process.env.port || 5000;
// middleware
app.use(cors())
app.use(express.json())
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.frk7m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();

      

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