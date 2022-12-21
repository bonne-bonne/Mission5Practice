const express = require("express");
const env = require("dotenv");
const mongoose = require('mongoose');
const http = require("http"); 

const Greeting = require("./greeting")


//========================= MIDDLEWARE ==================================//

env.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//HEALTH CHECK
app.get('/health', (req, res) => res.status(200).json({message: "Health check ok"}))



const MONGO_USERNAME= process.env.MONGO_USERNAME;
const MONGO_PASSWORD= process.env.MONGO_PASSWORD;
const MONGO_URL= `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@mission5cluster.lfn9r9z.mongodb.net`


// Connect to Mongoose
mongoose.set('strictQuery', true)//added to suppress a warning

mongoose.connect(MONGO_URL, {retryWrites: true, w: 'majority'})
.then(() => { console.log("DB connected")})
.catch(error => {console.log(error)})

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogPost = new Schema({
  author: ObjectId,
  title: String,
  body: String,
  date: Date
}); 


//========================= ENDPOINTS ==================================//
app.get('/', (req, res) =>{
    res.send({message: `There is a connection on port ${PORT}`})
})

app.post('/greeting', async(req, res) => {

    console.log(req.body)

    const greeting = new Greeting({ greeting: req.body.greeting})
    await greeting.save().then(() => console.log("Greeting Saved"))

    res.send({message: `Greeting ${req.body.greeting} was saved to the database`})
})





//========================= PORT ==================================//
const PORT = process.env.PORT || 8002
app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
})
