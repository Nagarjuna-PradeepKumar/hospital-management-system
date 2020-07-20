const router= require('express').Router();
const patient=require('../../Database_schemas/patient_schema')
const record=require('../../Database_schemas/patient-record_schema')
const {checkreception}=require('../../functions/User_check')
const validation= require('../../validation/patient_create_edit_validation')

/* --------CREATE PATIENT ------
-----------------------------*/

router.post('/create',checkreception,async(req,res)=>{
    const {error}=validation.createpatientvalidation(req.body)
    if(error) return res.send({"error":error.details[0].message})

    const newpatient = new patient({
        patient_name:req.body.patient_name,
        patient_age:req.body.patient_age,
        patient_gender:req.body.patient_gender,
        patient_occupation:req.body.patient_occupation,
        patient_address:req.body.patient_address,
        patient_maritalstatus:req.body.patient_maritalstatus,
        patient_blood_group:req.body.patient_blood_group,
        patient_phoneno:req.body.patient_phoneno,
        patient_email:req.body.patient_email,
    })

    const isuser = await patient.findOne({"patient_name":req.body.patient_name,"patient_phoneno":req.body.patient_phoneno})
    if(isuser){return res.send({"error":"patient details already available"})}
    if(!isuser){
        const savednewuser = await newpatient.save();
        if(savednewuser){
            const newrecord = new record({patient_id:savednewuser._id}).save();
            if(newrecord){return res.send({"success":"Successfully added patient to database"})}else{/* redirect to error*/return res.send({"error":"Error adding patinet details to database"})}
        }else{return res.send({"error":"Error adding patinet details to database"})}
    }
})


/* --------GET PATIENT DATA------
----------------------------------*/
router.post('/getdata',checkreception,async(req,res)=>{

    // const {error}=validation.getpatientvalidation(req.body)
    // if(error) return res.send({"error":error.details[0].message})

    if(req.body.patient_name!=undefined && req.body.patient_phoneno!=undefined){
        const patientdata = await patient.find({"patient_name":req.body.patient_name,"patient_phoneno":req.body.patient_phoneno})
        if(patientdata.length>0){return res.send({"success":patientdata})}else{/* redirect to error*/return res.send({"error":"No patient data found"})}
    }
    if(req.body.patient_name!=undefined && req.body.patient_phoneno===undefined){
        const patientdata = await patient.find({"patient_name":req.body.patient_name})
        if(patientdata.length>0){return res.send({"success":patientdata})}else{/* redirect to error*/return res.send({"error":"No patient data found"})}
    }
    if(req.body.patient_name===undefined && req.body.patient_phoneno!=undefined){
        const patientdata = await patient.find({"patient_phoneno":req.body.patient_phoneno})
        if(patientdata.length>0){return res.send({"success":patientdata})}else{/* redirect to error*/return res.send({"error":"No patient data found"})}
    }else{const patientdata = await patient.find({})
    if(patientdata.length>0){return res.send({"success":patientdata})}else{/* redirect to error*/return res.send({"error":"No patient data found"})}
    }
})

/* --------CHANGE PATIENT DATA------
------------------------------------*/
router.post('/changedata',checkreception,async(req,res)=>{

    const {error}=validation.changepatientvalidation(req.body)
    if(error) return res.send({"error":error.details[0].message})


    try{
        const isuser = await patient.findOne({"_id":{'$ne':req.body.patient_id},"patient_name":req.body.patient_name,"patient_phoneno":req.body.patient_phoneno})
        if(isuser){return res.send({"error":'Patient details already available'})}

        if(!isuser){

            const newdata= await patient.findOneAndUpdate({"_id":req.body.patient_id},{
                "patient_name":req.body.patient_name,
                "patient_age":req.body.patient_age,
                "patient_gender":req.body.patient_gender,
                "patient_occupation":req.body.patient_occupation,
                "patient_address":req.body.patient_address,
                "patient_maritalstatus":req.body.patient_maritalstatus,
                "patient_blood_group":req.body.patient_blood_group,
                "patient_phoneno":req.body.patient_phoneno,
                "patient_email":req.body.patient_email,
            },{useFindAndModify:false,new:true})
            if(await newdata){return res.send({"success":" Successfully updated changes to database "})}else{/* redirect to error page */ return res.send('error')}
        }
    }catch(err){/* redirect to error page */ return res.send({"error":"Error updating to database"})}
})

router.post('/getbyid',checkreception,async(req,res)=>{
    try{
    const data= await patient.findById({"_id":req.body.patient_id})
    if(data){return res.send({"success":data})}else({"error":"No data found"})
    }catch(err){return res.send({"error":"No data found"})}
})

module.exports=router;