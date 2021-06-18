const mongoose=require('mongoose')

const patient_schema = new mongoose.Schema({
    status:{type:Boolean,default:true,required:true},
    created:{type:Number,default:Date.now()},
    patient_name:{type:String,required:true,lowercase:true},
    patient_age:{type:Number,required:true},
    patient_gender:{type:String,required:true},
    patient_occupation:{type:String},
    patient_address:{type:String},
    patient_maritalstatus:{type:String},
    patient_blood_group:{type:String},
    patient_phoneno:{type:Number,required:true},
    patient_email:{type:String,lowercase:true},
})

module.exports= mongoose.model('patient',patient_schema)