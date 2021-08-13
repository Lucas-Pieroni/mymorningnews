var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const userModel = require ('../models/user')
var uid2 = require ("uid2");
var bcrypt = require ("bcrypt");
const { findById, deleteOne } = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET users info from Sign-up page + enregistrement DB. */
router.post('/sign-up',async function(req, res, next) {
  // console.log("info reçu du form signup", req.body)
  var password = req.body.password;
  var cost = 10;
  const hash = bcrypt.hashSync(password, cost);

  var alreadyExist = await userModel.findOne({username:req.body.username})
  if (alreadyExist == null){
    var newUser = new userModel({
    username: req.body.username,
    email: req.body.email,
    password: hash,
    token: uid2(32)
    });
   const user = await newUser.save()
    res.json({result : true, user});
  } else {
    res.json({result : false}); 
  }
});

/* GET users info from Sign-in page + vérif already in DB. */

router.post('/sign-in',async function(req, res, next) {
  // console.log("info reçu du form signin", req.body)
  var user = await userModel.findOne({email:req.body.email})
  console.log("user:", user)
  if (bcrypt.compareSync(req.body.password, user.password)){
    res.json({result : true, user}) 
  } else {
    res.json({result : false})
  }
});

router.post('/add-article-to-wishlist', async function(req, res, next){
  // console.log('add-article req.body', req.body);
  const curUser = await userModel.findOne({
    token:'PZsPRb7yc26EZqqLGdQtP9v9mBWy2OyC'
  })
  console.log('curUser', curUser);
  curUser.wishList.push({
    title: req.body.title,
    description: req.body.description,
    image: req.body.img
  })

  await curUser.save();

  res.json({result: true, curUser})
})

router.get('/display-my-articles', async function (req, res, next){
  // console.log('GET display-my-articles', req.query)
  const findUser = await userModel.findOne({
    token: 'PZsPRb7yc26EZqqLGdQtP9v9mBWy2OyC'
  })

  const myArticles = findUser.wishList
  res.json({myArticles})
})

router.delete('/delete-wishlist-article', async function (req, res, next) {
  console.log('DELETE req.body', req.body)
  const findUser = await userModel.findOne({
    token: 'PZsPRb7yc26EZqqLGdQtP9v9mBWy2OyC'
  })
  
  console.log('findUser', findUser)
 
  const newWishList = findUser.wishList.filter((article)=>(article.title != req.body.title))
  // console.log('filter req.body', req.body)
  // console.log('filter req.body', req.body)
  
  console.log('findUser wishlist', findUser.wishList.length)
  console.log('newWishList', newWishList.length)
  
  const updatedWishList= await userModel.updateOne(
    {token: 'PZsPRb7yc26EZqqLGdQtP9v9mBWy2OyC'},
    {wishList: newWishList}
  )

  

  res.json({result: true})

})


module.exports = router;
