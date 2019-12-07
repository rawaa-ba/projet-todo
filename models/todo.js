const mongoose = require ('mongoose');

const todoSchema=new mongoose.Schema({
description:{
    type:String,
    required:true
},
dateAjout:{
    type:String,
    required:true,
    default:new Date()
},
dateFin:{
    type:String,
    default:null
},
etat:{
    type:Boolean,
    default:false,
    required:true
    
},
idUser:{
    type:String,
    required:true
}
})
const Todo=mongoose.model('todo',todoSchema);
module.exports={Todo};