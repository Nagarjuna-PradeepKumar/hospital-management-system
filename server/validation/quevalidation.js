const Joi = require('@hapi/joi')

const queadd = (data)=>{
    const schema = Joi.object({
        patient_id: Joi.string().required(),
        visiting_doctor:Joi.string().required(),
        patient_name:Joi.string().required(),
        complaint:Joi.string().allow(''),
    });
   
    return schema.validate(data)
}

module.exports={queadd}