const router = require('express').Router();
const calendar = require('../../Database_schemas/plan-calendar_schema')
const {checkadmin}= require('../../functions/User_check')
const {getdates}=require('../../functions/getdates')

router.post('/fetchall',checkadmin,async (req,res)=>{
    const data = await calendar.find({},{"_id":0,"workingdays":0,"holidays":0,"__v":0})
    if(data){return res.send({"success":data})}else{return res.send({"error":"No plan found for that month"})}
})

router.post('/fetchmonth',checkadmin,async (req,res)=>{
    const data = await calendar.findOne({"yearmonth":req.body.yearmonth},{"_id":0})
    if(data){return res.send({"success":data})}else{return res.send({"error":"No plan found for that month"})}
})

router.post('/holiday',checkadmin,async(req,res)=>{
    try{
        const newworkingdays =await getdates(req.body.yearmonth,req.body.holidays)
        const updatedcalendar= await calendar.findOneAndUpdate({"yearmonth":req.body.yearmonth},{
            "workingdays":await newworkingdays.success,"holidays":req.body.holidays
        },{useFindAndModify:false,new:true,upsert:true})
        if(updatedcalendar){return res.send({"success":updatedcalendar})}else{return res.send({"error":"error updating database"})}
        }catch{err=>{return res.send({"error":err})}}
})

router.post('/delete',checkadmin,async(req,res)=>{
    try{
        const isdeleted= await calendar.findOneAndRemove({"yearmonth":req.body.yearmonth},
        {useFindAndModify:false,new:true})
        if(isdeleted){return res.send({"success":"Deleted calender"})}
    }catch{err=>{return res.send({"error":err})}}
})

module.exports=router;