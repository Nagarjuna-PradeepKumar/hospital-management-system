const Joi = require('@hapi/joi')

const create = (data)=>{
    const schema = Joi.object({
        patient_id: Joi.string().required(),
        doctor_name:Joi.string().required(),
        doctor_id:Joi.string().required(),
    });
   
    return schema.validate(data)
}

const deletecomplaint = (data)=>{
    const schema = Joi.object({
        patient_id: Joi.string().required(),
        complaint_id: Joi.string().required(),
    });
   
    return schema.validate(data)
}

const addcomplaint = (data)=>{
    const schema = Joi.object({
        patient_id: Joi.string().required(),
        complaint_id: Joi.string().required(),
        complaints:Joi.array(),
        interpretation:Joi.array(),
        medication:Joi.array(),
    });
   
    return schema.validate(data)
}

const createlabtest = (data)=>{
    const schema = Joi.object({
        patient_id: Joi.string().required(),
        complaint_id: Joi.string().required(),
        complaints:Joi.array(),
        interpretation:Joi.array(),
        medication:Joi.array(),
    });
   
    return schema.validate(data)
}

const dellabtest = (data)=>{
    const schema = Joi.object({
        patient_id: Joi.string().required(),
        labtest_id: Joi.string().required(),
    });
   
    return schema.validate(data)
}

const addlabtest = (data)=>{
    const schema = Joi.object({
        patient_id: Joi.string().required(),
        labtest_id: Joi.string().required(),
        test_suggested: Joi.array(),
    });
   
    return schema.validate(data)
}
const addlabresult = (data)=>{
    const schema = Joi.object({
        patient_id: Joi.string().required(),
        labtest_id: Joi.string().required(),
        test:Joi.string(),
        comment:Joi.string(),
    });
   
    return schema.validate(data)
}
const dellabresult = (data)=>{
    const schema = Joi.object({
        patient_id: Joi.string().required(),
        labtest_id: Joi.string().required(),
        result_id: Joi.string().required(),
    });
   
    return schema.validate(data)
}
module.exports= {create,
        deletecomplaint,
        addcomplaint,
        createlabtest,
        dellabtest,
        addlabtest,
        addlabresult,
        dellabresult
        }