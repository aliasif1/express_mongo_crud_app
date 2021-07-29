const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const postRouter = require('./routes/todo_route')

// Check the environment 
if(process.env.NODE_ENV !== 'production'){
    // Load the environment variables 
    require('dotenv').config();
}

const app = express();
const PORT = process.env.PORT || 5500

//set up the database
const databaseUri = process.env.MONGO_URI || 'mongodb://localhost:27017/todo_db' 
mongoose.connect(databaseUri, {seNewURLParser: true, useUnifiedTopology: true});
const db = mongoose.connection
db.on('error',(err)=>console.log('error: ' + err));
db.once('open',()=>console.log('connected to mongo'))

//set up middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(cors());
app.use('/todos',postRouter)

// Test Api endpoint
app.get('/', (req,res) => {
    res.send('Hello world');
})

app.listen(PORT, ()=>{
    console.log('Server Listening on PORT: ' + PORT);
})