const mongoose = require("mongoose");
const Schema = mongoose.Schema

const AddressSchema = new Schema({
     user: String,
     country: String,
     fullName: String,
     streetAddress: String,
     city: String,
     state: String,
     zipCode: Number,
     phoneNumber: String,
     delieverInstructions: String,
     securityCode:String
});

module.exports = mongoose.model("Address" , AddressSchema);