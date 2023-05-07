const mongoose = require("mongoose");
const Register = require("../models/registers_new");

mongoose.connect("mongodb://localhost:27017/SHE_HACKS").then(()=>{
    console.log("CONNECTED");
});

