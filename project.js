const express = require('express');
const app = express();
app.use(express.json());
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


//Create a GET Method Service 

app.get('/api/C0744287/Project', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("student_info_db");
  dbo.collection("recreational_events").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
    db.close();
  });
});
});

app.get('/api/C0744287/Project2', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("student_info_db");
  dbo.collection("library").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
    db.close();
  });
});
});



//Create a POST Method which will insert data


app.post('/api/Prabhjot', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("student_info_db");
  var myobj = {"title" : "Learning Mania", "city" : "Oshawa", "charges" : 20, };
  dbo.collection("recreational_events").insertOne(myobj, function(err, result) {
    if (err) throw err;
    res.send("1 document inserted");
    console.log("1 document inserted");
    db.close();
  });
});
});


//Create a PUT Method  

app.put('/api/C0744287/update', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("student_info_db");
  var myquery = { "title": "Hiking Trip" };
  var newvalues = { $set: { "title": "Christmas Party"} };
  dbo.collection("recreational_events").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
	
    db.close();
  });
  res.send("1 document updated");
});
});

//Create a delete Service 


app.delete('/api/delete',(req, res)=> {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("student_info_db");
  var myobj = { "book": "Web Access"};
  dbo.collection("library").deleteOne(myobj, function(err, result) {
    if (err) throw err;
    res.send("1 document deleted");
    console.log("1 document deleted");
    db.close();
  });
});
});


const port = process.env.PORT || 8081;
app.listen(port, () => console.log('Listening to port ${port}..'));


