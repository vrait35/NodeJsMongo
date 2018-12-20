var express=require('express');
var bodyParser=require('body-parser');
const mongoose=require('mongoose');
mongoose.connect('mongodb://user1:user123user@ds139331.mlab.com:39331/dbshag',
{useNewUrlParser:true});
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error: '));
db.once('open',function(){
  console.log("we're connected! ");
  var user={name:'Ivan2'};
  db.collection('persons').insertOne(user);
  db.collection('persons').find({},{limit:10}).toArray(function(err,docs){
    console.dir(docs);
  });

});


var exp=express();
 urlencodeParser=bodyParser.urlencoded({extended:false});
exp.set('view engine','ejs');
exp.use('/public',express.static('public'));
exp.get('/',function(req,res){
  res.render('index',{a:123});
});
exp.post('/',urlencodeParser,function(req,res){
  res.send(req.body);
});
exp.listen(3000);
console.log('OK....');
