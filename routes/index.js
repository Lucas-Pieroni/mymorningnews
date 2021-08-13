var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const userModel = require ('../models/user')
var uid2 = require ("uid2");
var bcrypt = require ("bcrypt");
const { findById } = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET users info from Sign-up page + enregistrement DB. */
router.post('/sign-up',async function(req, res, next) {
  console.log("info reçu du form signup", req.body)
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
  console.log("info reçu du form signin", req.body)
  var user = await userModel.findOne({email:req.body.email})
  console.log("user:", user)
  if (bcrypt.compareSync(req.body.password, user.password)){
    res.json({result : true, user}) 
  } else {
    res.json({result : false})
  }
});

router.post('/add-article-to-wishlist', async function(req, res, next){
  console.log('add-article req.body', req.body);
  const curUser = await userModel.findById('61163a0b18ecf995c8525c9f')
  console.log('curUser', curUser);
  curUser.wishList.push({
    title: req.body.title,
    description: req.body.description,
    image: req.body.img
  })

  await curUser.save();

  res.json({result: true, curUser})
})


module.exports = router;
