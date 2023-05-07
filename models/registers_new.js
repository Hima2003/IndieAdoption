const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/SHE_HACKS").then(()=>{
    console.log("mongodb 4connected");
});


const employeeSchema = new mongoose.Schema({
    name : {
        type : String,
        required :true,
        unique : true
    },
    email: {
        type :String,
        required : true,
        unique :true
    }
    ,
    phonenumber:{
        type :String,
        required : true,
        unique : true
    }
    ,
    second_phonenumber:{
        type :String,
        required : true,
        unique : true
    },
    state:{
        type :String,
        required : true,
        unique : true
    },
    district:{
        type :String,
        required : true,
        unique : true
    },
    city:{
        type :String,
        required : true,
        unique : true
    },
    comment:{
        type :String,
        required : true,
        unique : true
    }



})

console.log("hello");

const Register = new mongoose.model("RegisterA",employeeSchema);
module.exports = Register;

console.log("hello");