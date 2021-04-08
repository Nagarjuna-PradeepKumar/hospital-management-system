const Joi = require('@hapi/joi')


const createpatientvalidation = (data)=>{
    const schema = Joi.object({
        patient_name : Joi.string().lowercase().required(),
        patient_age : Joi.number().required(),
        patient_gender : Joi.string().required(),
        patient_occupation : Joi.string().allow(""),
        patient_address : Joi.string().allow(""),
        patient_maritalstatus : Joi.string().allow(""),
        patient_blood_group : Joi.string().allow(""),
        patient_phoneno : Joi.string().required(),
        patient_email : Joi.string().allow(""),
    });
   
    return schema.validate(data)
}

const getpatientvalidation = (data)=>{
    const schema = Joi.object({
        patient_name : Joi.string().lowercase().allow(""),
        patient_phoneno : Joi.string().allow(""),
    });
   
    return schema.validate(data)
}

const changepatientvalidation = (data)=>{
    const schema = Joi.object({
        patient_id:Joi.string().required(),
        patient_name : Joi.string().lowercase().required(),
        patient_age : Joi.number().required(),
        patient_gender : Joi.string().required(),
        patient_occupation : Joi.string().allow(""),
        patient_address : Joi.string().allow(""),
        patient_maritalstatus : Joi.string().allow(""),
        patient_blood_group : Joi.string().allow(""),
        patient_phoneno : Joi.number().required(),
        patient_email : Joi.string().allow(""),
    });
   
    return schema.validate(data)
}

const createpatienthistoryvalidation = (data)=>{
    const schema = Joi.object({
        patient_id:Joi.string().required(),
    });
   
    return schema.validate(data)
}
const deleditpatienthistoryvalidation = (data)=>{
    const schema = Joi.object({
        patient_id:Joi.string().required(),
        comment_id:Joi.string().required(),
    });
   
    return schema.validate(data)
}
module.exports= {createpatientvalidation,
    getpatientvalidation,
    changepatientvalidation,
    createpatienthistoryvalidation,
    deleditpatienthistoryvalidation}