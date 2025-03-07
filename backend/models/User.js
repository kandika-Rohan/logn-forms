import mongoose from "mongoose";

const userSchema=mongoose.Schema({
     email:{
          type:String,
          required:true,
     },
     username: String, 
     password: String 
});

const User = mongoose.model('User',userSchema);

export default User;

