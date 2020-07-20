const mongoose= require('mongoose')

const Rooms = new mongoose.Schema({
    status:{type:Boolean,default:true,required:true},
    roomno:{type:String},
    vacancy_status:{type:String,required:true,default:"vancant"},
    patient_id:{type:String},
    Patinet_name:{type:String},
    admission_date:{type:Number},
    admission_id:{type:mongoose.Types.ObjectId},
    history:[
                {
                    admission_id:{type:String},
                    patient_id:{type:String},
                    Patinet_name:{type:String},
                    admission_date:{type:Number},
                    discharge_date:{type:Number}
                }
            ]
})

module.exports=mongoose.model('room',Rooms)