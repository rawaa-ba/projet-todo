const express = require('express');
const bodyParser= require('body-parser');
const cors= require ('cors');
const user = require('./controllers/userController');
const todo =require('./controllers/todoController');
var app = express()
app.use(bodyParser.json())
app.use(cors())
app.use('/user',user)  
app.use('/todo',todo)
/*app.get('/hello/:nom',(req,res)=>{
    let name=req.params.nom
    console.log('My name is '+name)
res.status(200).send('Welcom ' +name) 
})*/
app.get('/',(req,res)=>{
    res.status(200).send({message:'welcom to the server'})
})

app.listen(3000,()=>console.log('server started !'))
