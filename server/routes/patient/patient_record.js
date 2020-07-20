const router= require('express').Router();
const record= require('../../Database_schemas/patient-record_schema')
const {checkdoctor} = require('../../functions/User_check')
const mongoose=require('mongoose')
const validation=require('../../validation/patient_create_edit_validation')


/* ---------ADD FAMILY HISTORY----------
---------------------------------------- */
router.post('/addfamilyhistory',checkdoctor,async(req,res)=>{

    // const {error}=validation.patienthistoryvalidation(req.body)
    // if(error) return res.send(error.details[0].message)

//send patient_id and subject,comment array from front end, 
    try{
        var commentid = mongoose.Types.ObjectId();
        const addhistory= await record.findOneAndUpdate({"patient_id":req.body.patient_id},{
            '$push':{"family_history":{"_id":commentid,"subject":req.body.subject,"comment":req.body.comment}}
        },{useFindAndModify:false,new:true})
        if(await addhistory){return res.send({"success":commentid})}else{return res.send({"error":"Error saving to database"})}
    }catch(err){return res.send('error')}
})

/* ---------ADD PERSONAL HISTORY----------
---------------------------------------- */
router.post('/addpersonalhistory',checkdoctor,async(req,res)=>{

    // const {error}=validation.patienthistoryvalidation(req.body)
    // if(error) return res.send(error.details[0].message)

//send patient_id and subject,comment array from front end, 
    try{
        var commentid = mongoose.Types.ObjectId();
        const addhistory= await record.findOneAndUpdate({"patient_id":req.body.patient_id},{
            '$push':{"personal_history":{"_id":commentid,"subject":req.body.subject,"comment":req.body.comment}}
        },{useFindAndModify:false,new:true})
        if(await addhistory){return res.send({"success":commentid})}else{return res.send({"error":"Error saving to database"})}
    }catch(err){return res.send('error')}
})

/* ---------ADD PAST HISTORY----------
---------------------------------------- */
router.post('/addpasthistory',checkdoctor,async(req,res)=>{
    
    // const {error}=validation.patienthistoryvalidation(req.body)
    // if(error) return res.send(error.details[0].message)
    
//send patient_id and subject,comment array from front end, 
    try{
        var commentid = mongoose.Types.ObjectId();
        const addhistory= await record.findOneAndUpdate({"patient_id":req.body.patient_id},{
            '$push':{"past_history":{"_id":commentid,"subject":req.body.subject,"comment":req.body.comment}}
        },{useFindAndModify:false,new:true})
        if(await addhistory){return res.send({"success":commentid})}else{return res.send({"error":"Error saving to database"})}
    }catch(err){return res.send('error')}
})

/* ---------DELETE FAMILY HISTORY----------
---------------------------------------- */
router.post('/delfamilyhistory',checkdoctor,async(req,res)=>{
    
    const {error}=validation.deleditpatienthistoryvalidation(req.body)
    if(error) return res.send({"error":error.details[0].message})

//send patient_id and subject,comment array from front end, 
    try{
        const delhistory= await record.findOneAndUpdate({"patient_id":req.body.patient_id},{
            '$pull':{"family_history":{"_id":req.body.comment_id}}
        },{useFindAndModify:false,new:true})
        if(await delhistory){return res.send({"success":'deleted family history'})}else{return res.send({"error":"Error deleting from database"})}
    }catch(err){return res.send({"error":err})}
})

/* ---------DELETE PERSONAL HISTORY----------
---------------------------------------- */
router.post('/delpersonalhistory',checkdoctor,async(req,res)=>{

    const {error}=validation.deleditpatienthistoryvalidation(req.body)
    if(error) return res.send(error.details[0].message)

//send patient_id and subject,comment array from front end, 
    try{
        const delhistory= await record.findOneAndUpdate({"patient_id":req.body.patient_id},{
            '$pull':{"personal_history":{"_id":req.body.comment_id}}
        },{useFindAndModify:false,new:true})
        if(await delhistory){return res.send({"success":'deleted personal history'})}else{return res.send({"error":"Error deleting from database"})}
    }catch(err){return res.send({"error":err})}
})

/* ---------DELETE PAST HISTORY----------
---------------------------------------- */
router.post('/delpasthistory',checkdoctor,async(req,res)=>{

    const {error}=validation.deleditpatienthistoryvalidation(req.body)
    if(error) return res.send(error.details[0].message)

//send patient_id and subject,comment array from front end, 
    try{
        const delhistory= await record.findOneAndUpdate({"patient_id":req.body.patient_id},{
            '$pull':{"past_history":{"_id":req.body.comment_id}}
        },{useFindAndModify:false,new:true})
        if(await delhistory){return res.send({"success":'deleted past history'})}else{return res.send({"error":"Error deleting from database"})}
    }catch(err){return res.send({"error":err})}
})

/* ---------EDIT FAMILY HISTORY----------
---------------------------------------- */
router.post('/editfamilyhistory',checkdoctor,async(req,res)=>{

    const {error}=validation.deleditpatienthistoryvalidation(req.body)
    if(error) return res.send(error.details[0].message)

//send patient_id and subject,comment array from front end, 
    try{
        const edithistory= await record.findOneAndUpdate({"patient_id":req.body.patient_id,"family_history._id":req.body.comment_id},{
            '$set':{"family_history.$.subject":req.body.subject,"family_history.$.comment":req.body.comment}
        },{useFindAndModify:false,new:true})
        if(await edithistory){return res.send('Edited family history')}else{return res.send('error')}
    }catch(err){return res.send('error')}
})

/* ---------EDIT PERSONAL HISTORY----------
---------------------------------------- */
router.post('/editpersonalhistory',checkdoctor,async(req,res)=>{

    const {error}=validation.deleditpatienthistoryvalidation(req.body)
    if(error) return res.send(error.details[0].message)


//send patient_id and subject,comment array from front end, 
    try{
        const edithistory= await record.findOneAndUpdate({"patient_id":req.body.patient_id,"personal_history._id":req.body.comment_id},{
            '$set':{"personal_history.$.subject":req.body.subject,"personal_history.$.comment":req.body.comment}
        },{useFindAndModify:false,new:true})
        if(await edithistory){return res.send('Edited personal history')}else{return res.send('error')}
    }catch(err){return res.send('error')}
})

/* ---------EDIT PERSONAL HISTORY----------
---------------------------------------- */
router.post('/editpasthistory',checkdoctor,async(req,res)=>{

    const {error}=validation.deleditpatienthistoryvalidation(req.body)
    if(error) return res.send(error.details[0].message)


//send patient_id and subject,comment array from front end, 
    try{
        const edithistory= await record.findOneAndUpdate({"patient_id":req.body.patient_id,"past_history._id":req.body.comment_id},{
            '$set':{"past_history.$.subject":req.body.subject,"past_history.$.comment":req.body.comment}
        },{useFindAndModify:false,new:true})
        if(await edithistory){return res.send('Edited past history')}else{return res.send('error')}
    }catch(err){return res.send('error')}
})

/* ---------GET PATIENT RECORD----------
---------------------------------------- */
router.post('/getall',checkdoctor,async(req,res)=>{
    const data = await record.findOne({"patient_id":req.body.patient_id})
    if(data){return res.send({"success":data})}else{return res.send({"error":"No patient data found"})}
})
module.exports=router