const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/SHE_HACKS").then(()=>{
    console.log("mongodb 4connected");
});



  const schema2 = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    // iid: {
    //   type: String,
    //   required: true
    // },
    state: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    age: {
      type: String,
      required: true
    },
    sterilized: {
      type: String,
      required: true
    },
    breed:{
      type: String,
      required: true

    },
    image: {
      type: String,
      required: true,
    },
  });






const adopt = new mongoose.model("Register222_adopt",schema2);
module.exports = adopt;

