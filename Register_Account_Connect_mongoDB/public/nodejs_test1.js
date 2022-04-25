var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://t****:b*******@cluster0.vvbyi.mongodb.net/Carinfo?retryWrites=true&w=majority";
//remember to write the syntax above again to connect to your MongoDB database account

//syntax to read, create, write content files of Nodejs
 var fs = require('fs');

// Requiring express module
const express = require('express');

//Requiring body-parser module
const bodyParser = require("body-parser");
 
// Creating express object
const app = express();
 
//use bodyparser



//we want content sending through "POST" method from a form to be in json format
app.use(bodyParser.json());



// app.use(bodyParser.urlencoded({ extended: true }));
var urlencodedParser = bodyParser.urlencoded({ extended: true })


// Function to serve all static files
// inside 'my-app' directory.
app.use(express.static('my-app')); 


//Loading index.html file when you access localhost:3000/
 app.get('/', (req, res) => {
      res.sendFile('./index.html', { root: __dirname });
 });


//Loading index2.html file when you access localhost:3000/index2
 app.get('/index2', (req, res) => {
   res.sendFile('./index2.html', { root: __dirname });
 });




//Loading Userdata1_mongoDB.json file when you access localhost:3000/Userdata1_mongoDB
 app.get('/Userdata1_mongoDB', (req, res) => {
     res.sendFile('./mongoDB_userdata/Userdata1_mongoDB.json', { root: __dirname });
 });



//receive 'POST' data from a form
app.post('/index2',urlencodedParser, function(req, res) {

    console.log("Connected to ReactJS");
   console.log(req.body);
  
   
     MongoClient.connect(url, function(err, db) {
         if (err) {
             console.log(err)
         }else{
           var dbo = db.db("mydb");
           dbo.collection("customers").insertOne(req.body, function(err, res) {
             if (err) {
                 console.log(err)
             }else{
                 console.log(`
                 !!!We have a new user register our page.!!! 
                 !!!User's data have been inserted to MongoDB Database!!!`);

                 //write content to file named Userdata1_mongoDB.json:
                 fs.writeFile('./mongoDB_userdata/Userdata1_mongoDB.json', `
                 {
                     "name_input":"${req.body.name_input}",
                     "email_input": "${req.body.email_input}"
                 }`, function (err) {
                 //The fs.writeFile() method replaces the specified file and content
                 //The fs.appendFile() method appends the specified content at the end of the specified file
                     if (err){
                         console.log(err)
                       }else{
                         console.log('Successfully writting content to Userdata1_mongoDB.json!!!');
                   
                       };
                 });

                  db.close();
             };
           });
         };
         
      
  
     
       });
   
    


    
});
 


// Defining port number
const PORT = process.env.PORT || 8080;                 
 


// Server setup
app.listen(PORT, console.log(`Server started on port ${PORT}`));



