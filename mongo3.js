const express = require('express');
const app = express();
app.use(express.json());
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const bodyParser = require('body-parser');
app.use(express.static('./htmlfile'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));


app.post('/insert', (req, res)=> {
console.log("Trying to insert  data..");
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("student_info_db");
  var myobj = {"title": req.body.title,"city" :req.body.city,"charges" :req.body.charges,"eventDate":req.body.eventDate,"seatsAvailable":req.body.seatsAvailable};
  dbo.collection("recreational_events").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");

    db.close();
  });
 
});
});


app.get('/show',(req,res)=> {

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("student_info_db");
  dbo.collection("recreational_events").find({}).toArray(function(err,result) {
  if (err) throw err;
  console.log(result);
  res.send(result);
  db.close();
 });
});
});

app.post('/update',(req,res)=> {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("student_info_db");
  var myquery = { "title": req.body.title };
  var newvalues = { $set: {"city":req.body.city } };
  dbo.collection("recreational_events").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});
});

app.post('/delete',(req, res)=> {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("student_info_db");
  var myobj = { "title": req.body.title };
  dbo.collection("recreational_events").deleteOne(myobj, function(err, result) {
    if (err) throw err;
    res.send("1 document deleted");
    console.log("1 document deleted");
    db.close();
  });
});
});

const port = process.env.PORT || 8081;
app.listen(port, () => console.log('Listening to port ${port}..'));
