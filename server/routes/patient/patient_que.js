const router=require('express').Router()
const validation=require('../../validation/quevalidation')
const que=require('../../Database_schemas/patient_que_schema')
const {checkreception}=require('../../functions/User_check')
const {tokennogetter}=require('../../functions/tokenno_getter')


router.post('/add',checkreception,async(req,res)=>{
    const {error}=validation.queadd(req.body)
    if(error) return res.send({"error":error.details[0].message})

        const newque = new que({
            patient_id:req.body.patient_id,
            token_no:await tokennogetter(),
            visiting_doctor:req.body.visiting_doctor,
            patient_name:req.body.patient_name,
            complaint:req.body.complaint,
        })
        const ispresent = await que.findOne({"patient_id":req.body.patient_id})
        if(ispresent){return res.send({"error":"Patient has already been given a token"})}
        if(!ispresent){
            const savedtoque = await newque.save();
            if(savedtoque){return res.send({"success":`The patient's token number is ${savedtoque.token_no}`})}else{/* redirect to error*/return res.send({"error":"Error saving to database"})}
        }
})

router.post('/delete',checkreception,async(req,res)=>{

    const deleteuser = await que.findOneAndRemove({"patient_id":req.body.patient_id},{useFindAndModify:false})
    if(deleteuser){return res.send({"success":"Removed patient from que"})}else{return res.send({"error":"Error removing patient from que"})}
})

router.post('/get',checkreception,async(req,res)=>{

    const getque = await que.find({})
    if(getque){return res.send({"success":getque})}else{return res.send({"error":"No patients in que"})}
})

router.post('/letinside',checkreception,async(req,res)=>{

    const letinside = await que.findOneAndUpdate({"patient_id":req.body.patient_id},{"quetype":"attending"},{useFindAndModify:false})
    if(letinside){return res.send({"success":"Done"})}else{return res.send({"error":"Error updating database"})}
})


module.exports=router