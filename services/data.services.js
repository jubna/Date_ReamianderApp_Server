const { mquery } = require('mongoose');
const db = require('./db')

  const login=(req,email,password)=> {
  return db.User.findOne({email,password})
  .then(user=>{
    if(user){
      console.log(user)
       req.session.currentUser=user.email;     
      return{
        statusCode:200,
           status:true,
           message:"successfully login",
           name:user.username  
       }
    }
    else{
      return{
        statusCode:422,
          status:false,
          message:"Invalid credentials"
      }
    }
  })
  }
 
  const register=(email,username,password)=>{
    return db.User.findOne({email})
    .then(user=>{
      if(user){
     return {
       statusCode:422,
       status:false,
       message:"User exist"
     }
   }
     else{
      const newUser=new db.User({
         email,
         username,
         password,
       })
       newUser.save();
    return{
     statusCode:200,
        status:true,
        message:"successfully registered"
    }
     }
    })
 }

  const addRemainder=(req,email,date,eventMsg)=>{
    return db.User.findOne({email})
    .then(user=>{
       if(user){
        user.event.push({date:date,eventMsg:eventMsg})
        user.save()
        return{
            statusCode:200,
            status:true,
            message:"saved",  
        }
        }
        else{
            return{
            statusCode:422,
            status:false,
            message:"can't save"
        }
      }
        })
}
const dltEvent=(email,eventDet)=>{
  console.log(email,eventDet);
  return db.User.findOneAndUpdate({email:email},{$pull:{event:{eventMsg:eventDet}}})
  .then(user=>{
    console.log(user)
    if(user){
      return{
          statusCode:200,
          status:true,
          message:"deleted",
      }
    }
    else{
      return{
        statusCode:422,
        status:false,
        message:"can't dlt"
    }
    }
  })
}
const editEvent=(email,indexNum,Edate,EMsg)=>{
  console.log(email,indexNum,Edate,EMsg)
  let index=parseInt(indexNum)
  return db.User.findOne({email:email})
  .then(user=>{
    if(user){
      if(user.event[index]["date"]!=Edate && Edate!=""){
      user.event[index]["date"]=Edate
      }
      if(user.event[index]["eventMsg"]!=EMsg&& EMsg!=""){
      user.event[index]["eventMsg"]=EMsg
      }
 
      user.markModified('event');
      user.save();
      return{
          statusCode:200,
          status:true,
          message:"edited",
      }

    }
    else{
      return{
        statusCode:422,
        status:false,
        message:"can't edit"
    }
    }
  }) 
}


/* const editEvent=(email,indexNum,evnDate,evnDetail)=>{
  console.log(email,indexNum,evnDate,evnDetail)
  let index=parseInt(indexNum)
 return db.User.findOne({email}) 
  .then(user=>{
    
    if(user){
      if(user.event[index]["date"]!=evnDate && evnDate!=""){
      user.event[index]["date"]=evnDate
      }
      if(user.event[index]["eventMsg"]!=evnDetail && evnDetail!=""){
      user.event[index]["eventMsg"]=evnDetail
      }
 
      user.markModified('event');
      user.save();
      return{
          statusCode:200,
          status:true,
          message:"edited",
      }

    }
    else{
      return{
        statusCode:422,
        status:false,
        message:"can't edit"
    }
    }
  }) 
} */
  
const showEvents=(req,email)=>{
  return db.User.findOne({email})
  .then(user=>{
    
      if(user){
        return{
          statusCode:200,
          status:true,
          message:user.event,
          
           
      }
    }
    else{
      return{
        statusCode:422,
        status:false,
        message:"can't get"
    }
    }
  })

}

const DisplayRemainder=(email)=>{
  return db.User.findOne({email})
  .then((user)=>{
    if(user){
      UserEvent=user.event;
       var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    var msg=""
    console.log(today); 
    for(i=0;i<user.event.length;i++){
      if(user.event[i]["date"]==today){
        msg="Hi, today is your "+user.event[i]["eventMsg"]
      }
      else{
        msg="Hi, you don't have any remainders today"
      }
    }
    return{
      statusCode:200,
      status:true,
      message: msg
      }
}
else{
  return{
    statusCode:422,
    status:false,
    message:"can't get"
}
}
  })
}

  module.exports={
    register,
    login,
     addRemainder,
     showEvents,
     dltEvent,
     editEvent,
     DisplayRemainder
}