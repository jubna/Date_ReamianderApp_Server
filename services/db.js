const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DateRemainder',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false 
})

const User=mongoose.model('User',{
    email:String,
      username: String,
     password: String,
      event:Array
})

module.exports={
    User
}