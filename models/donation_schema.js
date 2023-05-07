const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/SHE_HACKS").then(()=>{
    console.log("mongodb 4connected");
});


const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    required: true
  }
 





});


const Register_payment = new mongoose.model("Register2_payment",schema);
module.exports = Register_payment;

