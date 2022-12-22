const express = require("express");
const env = require("dotenv");
const mongoose = require('mongoose');
const cors = require('cors')
const http = require("http"); 

const Greeting = require("./greeting")


//========================= MIDDLEWARE ==================================//

env.config();
const app = express();
app.use(express.json());
app.use(cors());
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




//========================= ENDPOINTS ==================================//
app.get('/', (req, res) =>{
    res.send({message: `There is a connection on port ${PORT}`})
})

app.get('/get-greeting', async(req, res) => {
    const getGreeting =  await Greeting.findById("63a397d1c18e52a43d530b10")
    res.send({ message: getGreeting.greeting })
})

app.post('/greeting', async(req, res) => {

    console.log(req.body)

    const greeting = new Greeting({ greeting: req.body.inputValue})
    await greeting.save().then(() => console.log("Greeting Saved"))

    console.log({message: `Greeting '${req.body.inputValue}' was saved to the database`})

    res.send({message: req.body.inputValue})
})




// run()
// async function run(){
//     try {
//         const banana = await Greeting.findById("63a397d1c18e52a43d530b10")
//         console.log(banana)
//     } catch (e) {
//         console.log(e.message)
//     }
// }





//========================= PORT ==================================//
const PORT = process.env.PORT || 8002
app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
})
