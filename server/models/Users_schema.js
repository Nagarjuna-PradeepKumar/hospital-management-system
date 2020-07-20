const mongoose= require('mongoose')

const Users= new mongoose.Schema({
    status:{type:Boolean,default:true,required:true},
    user_name:{type:String,required:true,lowercase:true},
    user_role:{type:String,required:true,lowercase:true},
    phoneno:{type:String,required:true},
    email:{type:String,lowercase:true},
    address:{type:String,required:true},
    password:{type:String,required:true},
    attendence:{type:String},
})

module.exports=mongoose.model('user',Users)