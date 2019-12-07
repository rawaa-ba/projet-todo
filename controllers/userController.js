const express = require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {User}=require('./../models/user');
const {mongoose}=require('./../db/config');
var app = express();

app.get('/',(req,res)=>{
    res.status(200).send({message:'welcom to user Controller'})
})

app.post('/register',(req,res)=>{
    let data =req.body;
    let user=new User({
        firstname:data._firstname,
        lastname:data._lastname,
        phone:data._phone,
        email:data._email,
        password:bcrypt.hashSync(data._password,10)
    })
    user.save().then((userFromdb)=>{
        console.log(userFromdb);
        res.status(200).send({message:"utilisateur enregistré avec succés"})
    
    }).catch((erreur)=>{
        res.status(400).send(erreur)
    })

})
app.post('/login',(req,res)=>{
let data =req.body;
let email=data._email;
let password=data._password;
User.findOne({email}).then((userFromdb)=>{
    if (!userFromdb){res.status(404).send({message:"email incorrect"})}
    else {
    let compare=bcrypt.compareSync(password,userFromdb.password)
    if (!compare){res.status(404).send({message:"password incorrect"})}
    else {let token =jwt.sign({idUsesr:userFromdb._id},'my secret key')
    res.status(200).send({token})
    }
}
}).catch((error)=>{
    console.log(error);
    
})
})
module.exports=app