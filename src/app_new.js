const express = require("express");
const session = require("express-session");
const hbs = require("hbs");
const path = require("path");
const app = express();
const multer = require('multer');

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret : "secret"
}))

require("../db/connection_db.js");
const mongoose = require("mongoose");

const Register = require("../models/registers_new");
const Register22 = require("../models/goods");
const Register_payment = require("../models/donation_schema");
const adopt = require("../models/adopt_schema");



mongoose.connect("mongodb://localhost:27017/SHE_HACKS").then(()=>{
    console.log("SHE HACKS DB CONNECTED");
});

const port = process.env.PORT || 5002;
const static_path = path.join(__dirname,"../public");
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
const upload = multer({ storage: storage });
app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))
app.use(express.static(static_path));

app.set('views', path.join(__dirname,'../templates_new'));
app.set("view engine","hbs");
const partials_path = path.join(__dirname,"../templates_new/partials_new");
hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{
    res.render("../templates_new/home");
});

app.get("/report",(req,res)=>{
    res.render("../templates_new/report");
});
app.get("/donation",(req,res)=>{
    res.render("../templates_new/donation");
});
app.get("/admin_adopt_update",(req,res)=>{
    res.render("../templates_new/admin_adopt_update");
});

app.get("/donation_goods",(req,res)=>{
    res.render("../templates_new/donation_goods");
});

app.get("/our_story",(req,res)=>{
    res.render("../templates_new/our_story");
});


app.get("/adoption",(req,res)=>{
    res.render("../templates_new/adoption");
});

app.get("/adminpage",(req,res)=>{
    res.render("../templates_new/adminpage");
});


app.get("/HeaderFooter",(req,res)=>{
    res.render("../templates_new/HeaderFooter");
});

app.get("/home",(req,res)=>{
    res.render("../templates_new/home");
});

// app.get("/admin_view",(req,res)=>{
//     res.render("../templates_new/admin_view");
// });

app.get("/admin",(req,res)=>{
    res.render("../templates_new/admin");
});

app.get("/admin_adopt_update",(req,res)=>{
    res.render("../templates_new/admin_adopt_update");
});

// app.get('/admin_view', async (req, res) => {
//   const users = await Register.find();
//   res.render('admin_view', { users });
// });


app.get('/admin_view', async (req, res) => {
    const users = await Register.find();
    res.render('admin_view', { users });
  });

  app.get('/goods_view', async (req, res) => {
    const users2 = await Register22.find();
    res.render('goods_view', { users2 });
  });

  app.get('/donation_view', async (req, res) => {
    const users2 = await Register_payment.find();
    res.render('donation_view', { users2 });
  });

  app.get("/user_adoption", async (req, res) => {
    const adoptions = await adopt.find();
    res.render("../templates_new/user_adoption", { adoptions });
  });
  

  app.post("/admin_adopt_update", upload.single("image"), async (req, res) => {
    // const { name, id, state, city, pincode, gender, sterilized, age, breed } = req.body;
    try {
        const user = new adopt({
            name : req.body.name,
            // iid : req.body.iid,
            state : req.body.state,
            city : req.body.city,
            pincode : req.body.pincode,
            gender : req.body.gender,
            sterilized : req.body.sterilized,
            age : req.body.age,
            breed : req.body.breed,
            image : req.file.path
          
        });

        // req.body.image = req.file.path;

      await user.save();
      res.status(201).render("../templates_new/adminpage"); 
    } catch (error) {
      console.log(error);
      res.status(500).send("Error registering user");
    }
  });



app.post("/donation", async (req,res)=>{
    try{ 
        console.log("...");
        const data = new Register_payment({
            name : req.body.name,
            email : req.body.email,
            phone : req.body.phone,
            amount : req.body.amount,
            purpose : req.body.purpose,
          
        });
        const registered = await data.save();
        // console.log("grievance saved!!!");
        res.status(201).render("../templates_new/HeaderFooter"); 
    } catch(error){
        console.log("123456789");
        res.status(400).send(error);
    }
});

// app.post("/admin_adopt_update", async (req,res)=>{
//     try{ 
//         console.log("...");
//         const data = new adopt({
//             name : req.body.name,
//             email : req.body.email,
//             phone : req.body.phone,
//             amount : req.body.amount,
//             purpose : req.body.purpose,
          
//         });
//         const registered = await data.save();
//         // console.log("grievance saved!!!");
//         res.status(201).render("../templates_new/HeaderFooter"); 
//     } catch(error){
//         console.log("123456789");
//         res.status(400).send(error);
//     }
// });






app.post("/report", async (req,res)=>{
    try{ 
        console.log("...");
        const data = new Register({
            name : req.body.name,
            email : req.body.email,
            phonenumber : req.body.phonenumber,
            second_phonenumber : req.body.second_phonenumber,
            state : req.body.state,
            city : req.body.city,
            district : req.body.district,
            comment : req.body.comment
        });
        const registered = await data.save();
        // console.log("grievance saved!!!");
        res.status(201).render("../templates_new/HeaderFooter"); 
    } catch(error){
        console.log("123456789");
        res.status(400).send(error);
    }
});


app.post('/donation_goods', async (req, res) => {
    // Create a new donation instance with the request data
    
    // Save the new donation to the database
    try {
        const newDonation = new Register22({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            goods: {
              softToys: !!req.body['goods-type'] && req.body['goods-type'].includes('soft-toys'),
              slowFeeders: !!req.body['goods-type'] && req.body['goods-type'].includes('slow-feeders'),
              blankets: !!req.body['goods-type'] && req.body['goods-type'].includes('blankets'),
              towels: !!req.body['goods-type'] && req.body['goods-type'].includes('towels'),
              carriers: !!req.body['goods-type'] && req.body['goods-type'].includes('carriers'),
              others: !!req.body['goods-type'] && req.body['goods-type'].includes('others')
            },
            pickupDate: req.body['pickup-date'],
            pickupTime: req.body['pickup-time']
          });
  
          
      const result = await newDonation.save();
      res.send('Thank you for your donation!');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error saving donation to database');
    }
  });




app.listen(port, ()=>{
    console.log('Server started on port no: ' + port);
});
