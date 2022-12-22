const mongoose = require("mongoose")

const greetingSchema = new mongoose.Schema({
    greeting: {
        type: String,
        required: true,
        // validate:{
        //     validate: v => typeof greeting === string
        // }
    }})
    


module.exports = mongoose.model("Greeting", greetingSchema)