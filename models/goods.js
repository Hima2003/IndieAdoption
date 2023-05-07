const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/SHE_HACKS").then(()=>{
    console.log("mongodb 4connected");
});


const donationSchema = new mongoose.Schema({
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
  address: {
    type: String,
    required: true
  },
  goods: {
    softToys: {
      type: Boolean,
      default: false
    },
    slowFeeders: {
      type: Boolean,
      default: false
    },
    blankets: {
      type: Boolean,
      default: false
    },
    towels: {
      type: Boolean,
      default: false
    },
    carriers: {
      type: Boolean,
      default: false
    },
    others: {
      type: Boolean,
      default: false
    }
  },
  pickupDate: {
    type: Date,
    required: true
  },
  pickupTime: {
    type: String,
    required: true
  }
});


const Register22 = new mongoose.model("Register2",donationSchema);
module.exports = Register22;

