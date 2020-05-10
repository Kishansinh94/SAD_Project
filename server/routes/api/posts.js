
const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//get

router.get('/',async (req, res) => {
  const posts = await loadPostCollection();

  res.send(await posts.find({}).toArray());
 
});



//temp


//add

router.post('/', async (req,res) => {
    const posts = await loadPostCollection();

    await posts.insertOne({
        uid: req.body.uid,
        text: req.body.text,
        name: req.body.name,
        email:req.body.email,
        createdAt: new Date()
    });
    res.status(201).send(); 
});

//dlt
router.delete('/:id', async (req, res) =>{
    console.log(req.params.id);
    console.log('in delete');
    const posts = await loadPostCollection();
    await posts.deleteOne({_id:new mongodb.ObjectID( req.params.id)});
    res.status(200).send();
});





async function loadPostCollection(){
    const client = await mongodb.MongoClient.connect 
    ('mongodb+srv://vue11:vue11@cluster0-s21uc.mongodb.net/test?retryWrites=true&w=majority',{
        useNewUrlParser: true
    });
    return client.db('vue_express').collection('posts');
} 

module.exports=router;