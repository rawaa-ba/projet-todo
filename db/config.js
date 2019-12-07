const mongoose=require('mongoose');


mongoose.connect('mongodb://localhost:27017/todoapp',
{useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true})


module.exports={mongoose}
