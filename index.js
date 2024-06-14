const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
// const bodyparser = require('body-parser');
const port = 80;
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/portfoliooo');
  
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }
  const danceapps = new mongoose.Schema({
    'name': String,
    'phone': String,
    'email': String,
    'desc': String
  });
  const Contact = mongoose.model('portfoliooo', danceapps);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded({ extended: true }))

// PUG SPECIFIC STUFF
app.set('view engine', 'ejs') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    
    const params = { }
    res.status(200).render('index.html', params);
})
app.get("/contact", (req, res)=>{ 
    const params = { }
    res.status(200).render('contact.html', params);
});
app.post("/contact", (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send('This item has been saved to the database')
    }).catch(()=>{
    res.status(400).send('item was not saved to the databse')
})
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});


// var express = require("express");
// var app = express();
// var port = 3000;
 

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/contact.html");
//   });
  
//   var mongoose = require("mongoose");
// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost:27017/node-demo");

// var nameSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     phone:String,
//     reason:String
//   });

//   var User = mongoose.model("User", nameSchema);
//   var bodyParser = require('body-parser');
//   app.use(bodyParser.json());
//   app.use(bodyParser.urlencoded({ extended: true }));

//   app.post("/addname", (req, res) => {
//     var myData = new User(req.body);
//     myData.save()
//       .then(item => {
//         res.send("item saved to database");
//       })
//       .catch(err => {
//         res.status(400).send("unable to save to database");
//       });
//   });

  

// app.listen(port, () => {
//   console.log("Server listening on port " + port);
// });