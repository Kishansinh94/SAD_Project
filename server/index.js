const express  = require('express');
const bodyParser  = require('body-parser');
const cors = require('cors');
const mongodb = require('mongodb');
const mongoose = require('mongoose'); 
const User  = require('./models/User'); 
const SPost  = require('./models/SPost'); 

const bcrpyt= require('bcrypt');
const app = express();
const jwt = require( 'jsonwebtoken');
var tuid = String;


//middle

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded ({extended:false}));   //added for login

const posts = require('./routes/api/posts');
app.use('/api/posts', posts);

//Forlogin registration start here
//mongo connect
mongoose.connect('mongodb+srv://vue11:vue11@cluster0-s21uc.mongodb.net/test?retryWrites=true&w=majority')

//routes
app.post('/signup', (req,res,next) => {
    const newUser = new User ({
        email : req.body.email,
        name : req.body.name,
      // password : req.body.password
        password: bcrpyt.hashSync(req.body.password, 10)
    })
    newUser.save(err => {
        if(err){
            return res.status(400).json({
                title: 'error',
                error: 'email in use'
            })
        }
        return res.status(200).json({
            title:'signup sucess'
        }) 
    })
})

app.post('/login', (req,res,next) =>{
    User.findOne({ email: req.body.email}, (err,user) =>{
        if (err) return res.status(500).json ({
            title : 'server erro',
            error: err
        })
        if(!user){
            return res.status(401).json({
                title: 'user not found',
                error: 'invalid creddential'
            })
        }
      //  console.log(req.body.password);
//console.log(user.password);
        //incorrect password

       // var result = bcrypt.compareSync(req.body.password, user.password);
 /* if (req.body.password === user.password) {
    console.log("Password correct");
} else {
    console.log("Password wrong");
}*/
       if(bcrpyt.compareSync(req.body.password, user.password)){
        
            let token = jwt.sign({userID: user._id},'secretkey');
            return res.status(200).json({
                title: 'login sucess',
                token: token})
    
}else {
return res.status(401).json({
    title: 'login failed',
    error: 'invalid credential'
})
}
  })  
})

//router for getting user info for token
app.get('/user', (req,res,next) => {
    let token = req.headers.token;
    jwt.verify(token,'secretkey', (err,decoded) => {
      if (err) return res.status(401).json({
        title: 'UnAuthorised User'
      })
      //when token is valid
     
      User.findOne({_id: decoded.userID}, (err, user) => {
        if (err) return console.log(err)
       return res.status(200).json({
           title: 'Userinformation fetched',
           user: {
            email: user.email,
            name: user.name,
            _id:user._id
        }
       })
    })
    } )
})

//new get find one
app.get('/example/b',  (req, res, next) => {
  
    let token = req.headers.token;
    //var decd=jwt_decode(token);
    jwt.verify(token,'secretkey', (err,decoded) => {
      if (err) return res.status(401).json({
        title: 'UnAuthorised User'
      })
      console.log(decoded.userID);
    
      
   // update(decoded.userID);
//temp find code


const result1 = finddata(decoded.userID);
console.log("result1",result1);
//res.send( res.status(200).json({ result}))
   /* User.findOne({uid: decoded.userID}, (err, SPost) => {
    if (err) return console.log(err) 
   // console.log(res.status(200).json({SPost}));
    //res.send( res.status(200).json({
     //  SPost
    //}))
   }
  )*/
})
})



//for updating
app.post('/example/updt',  (req, res, next) => {
  
    let id = req.body.id;
    //var decd=jwt_decode(token);
  //  jwt.verify(token,'secretkey', (err,decoded) => {
    //  if (err) return res.status(401).json({
      //  title: 'UnAuthorised User'
     // })
      console.log(id);
    
      
   update(id,req.body.name,req.body.text);
   res.send( res.status(200).json({
        title: 'Update Done'

   }))
    //  SPost
//temp find code
    })


function finddata(ruid, callback){
   var result2 ; 
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://vue11:vue11@cluster0-s21uc.mongodb.net/test?retryWrites=true&w=majority";
       MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("vue_express");
        var myquery = { uid:ruid};
       var result= dbo.collection("posts").find(myquery).toArray(function(err,result) {
          if (err) throw err;
         let result2 = result;
          console.log(result);
          
          db.close();
          return callback (result);
        });
        console.log("result2",result2);
      }); 
//      return callback(result2);
}

//for update temp
function update(ruid, rname,rtxt){
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://vue11:vue11@cluster0-s21uc.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("vue_express");
  var myquery = { uid: ruid };
  var newvalues = { $set: {name: rname, text: rtxt } };
  dbo.collection("posts").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});
}



//get very temp
async function loadPostCollection(){
    const client = await mongodb.MongoClient.connect 
    ('mongodb+srv://vue11:vue11@cluster0-s21uc.mongodb.net/test?retryWrites=true&w=majority',{
        useNewUrlParser: true
    });
    return client.db('vue_express').collection('posts');
} 

//for serach working


app.get('/example/c',async (req, res) => {
   
   //code to decode token
    let token = req.headers.token;
    console.log(token);
var uid2= jwt.verify(token,'secretkey', (err,decoded) => {
  if (err) return (error)

  return decoded.userID
})

    var myquery = { uid:uid2};
    const posts = await loadPostCollection();
    res.send(await posts.find(myquery).toArray());
   console.log(await posts.find(myquery).toArray())
    
} ) 




const port = process.env.PORT || 5001;

app.listen(port, ()=> console.log('server is running at ',port));


