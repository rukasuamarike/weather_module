
const mongo = require('mongodb');
const express = require('express');
const { default: axios } = require('axios');
const app = express();
const MongoClient = mongo.MongoClient;
const port = 3000;
const weatherKey=API_TOKEN;
const town="westport";
const connectString = 'mongodb://localhost:27017'
const dbName = 'test';
var db;

app.set('view engine','pug')
app.use(express.static('public'));

//eventually rewrite this using promises and/or async/await
MongoClient.connect(connectString, function(err, client) {
  if (err) {
    console.log("The web server still running without database support.")
  }
  else {
    console.log("Connected successfully to MongoDB server");
    db = client.db(dbName);
  }
});

app.get('/someroute', function (req, res) {
  // const collection = db.collection('myCollection');
  // collection.find({}).toArray(function(err, docs) {
  //   console.log("Found the following records");
  //   console.log(docs)
  //   res.json(docs)
  // });
  res.json("Hello Client!")
})
app.get('/forecast',function(req,res){
  var query = req.url.substring(req.url.indexOf('?')+1,req.url.length);
  axios.get('http://'+'api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+weatherKey)
  .then(function(response){
    console.log(response.data);
    res.render('widget',{ww:response.data})
    //res.json(response.data);
  })
  .catch(function(error){
    console.log(error);
    res.send('please fill in the field first');
  })
})

app.get('/localforecast',(req,res)=>{
  var query = req.url.substring(req.url.indexOf('?')+1,req.url.length).split(',');
  console.log("hi",query);
  axios.get('http://'+'api.openweathermap.org/data/2.5/weather?lat='+query[0]+'&lon='+query[1]+'&appid='+weatherKey)
  .then(function(response){
    console.log(response.data);
    res.render('widget',{ww:response.data})
  })
  .catch(function(error){
    console.log(error);
    res.send(error);
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
