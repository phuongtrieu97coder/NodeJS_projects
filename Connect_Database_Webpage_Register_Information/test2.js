var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://thp********:***************@cluster0.vvbyi.mongodb.net/*********?retryWrites=true&w=majority";
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


// Defining port number
const PORT = 8080;                 
 
// Function to serve all static files
// inside 'web_develop_project' directory.
app.use(express.static('web_develop_project')); 

//Help you load images files from 'image' folder inside 'web_develop_project' directory
//when you access  localhost:8080/image/...filename
app.use('/image', express.static('image'));

//Loading test1.html file when you access localhost:8080/test1
app.get('/test1', (req, res) => {
     res.sendFile('./test1.html', { root: __dirname });
});



//Loading test2.html file when you access localhost:8080/test2
app.get('/test2', (req, res) => {
    res.sendFile('./test2.html', { root: __dirname });
});


//Loading Userdata1_mongoDB.json file when you access localhost:8080/test2
app.get('/Userdata1_mongoDB', (req, res) => {
    res.sendFile('./Userdata1_mongoDB.json', { root: __dirname });
});



//receive 'POST' data from a form
app.post('/test2',urlencodedParser, function(req, res) {
// if you use:  app.use(bodyParser.urlencoded({ extended: true })); above =>
//you have to write:  app.post('/test1', function(req, res)

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
                    fs.writeFile('Userdata1_mongoDB.json', `
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
   
     //after writing data into JSON file, test2.html file will open
     //I set 15 seconds because the time waiting for data write into JSON file can be 
     //longer than 3 seconds
     setTimeout(()=>{res.redirect('/')},15000);
    
});
 
// Server setup
app.listen(PORT, () => {
  console.log(`Running server on PORT ${PORT}...`);
});
