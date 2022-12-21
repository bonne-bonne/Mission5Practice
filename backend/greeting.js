const mongoose = require("mongoose")

const greetingSchema = new mongoose.Schema({
    greeting: String
})


module.exports = mongoose.model("Greeting", greetingSchema)