import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema=mongoose.Schema
const Profile=new Schema({
    id:{
type:Schema.Types.ObjectId
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
      
    },
    password:{
        type:String,
  required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    date:{
        type:String,
        default:new Date().toLocaleString('en-NZ')
       }
})

Profile.methods.match=async function(inputpassword){
 return await bcrypt.compare(inputpassword,this.password)
}

const User=mongoose.model('user',Profile)



export default User