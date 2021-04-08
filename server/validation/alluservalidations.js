const Joi = require('@hapi/joi')


const createuservalidation = (data)=>{
    const schema = Joi.object({
        user_name : Joi.string().lowercase().required(),
        user_role : Joi.string().required().disallow(""),  
        phoneno : Joi.number().required(),
        email: Joi.string().allow(""),
        address : Joi.string().required(),
        password: Joi.string().required(),
    });
   
    return schema.validate(data)
}

const userloginvalidation = (data)=>{
    const schema = Joi.object({
        user_name : Joi.string().lowercase().required(),
        phoneno : Joi.number().required(),
        password: Joi.string().required(),
    });
   
    return schema.validate(data)
}
const usergetdatavalidation = (data)=>{
    const schema = Joi.object({
        user_name : Joi.string().lowercase().allow(""),
        phoneno : Joi.number().allow(""),
    });
   
    return schema.validate(data)
}

const changeuservalidation = (data)=>{
    const schema = Joi.object({
        user_id: Joi.string().required(),  
        user_name : Joi.string().lowercase().required(),
        user_role : Joi.string().required(),  
        phoneno : Joi.number().required(),
        email: Joi.string().allow(""),
        address : Joi.string().required(),
    });
   
    return schema.validate(data)
}

const changeuserpasswordvalidation = (data)=>{
    const schema = Joi.object({
        user_id: Joi.string().required(),
        password: Joi.string().required(),
    });
   
    return schema.validate(data)
}

const deleteuservalidation = (data)=>{
    const schema = Joi.object({
        user_id: Joi.string().required(),
    });
   
    return schema.validate(data)
}

const markattendencevalidation =  (data)=>{
    const schema = Joi.object({
        user_id: Joi.string().required(),
        date: Joi.string().required(),
    });   
    return schema.validate(data)
}
const getattendencevalidation =  (data)=>{
    const schema = Joi.object({
        user_name: Joi.string().required().allow(undefined),
        phoneno: Joi.string().required().allow(undefined),
        date: Joi.string().required(),
    });   
    return schema.validate(data)
}

module.exports= {createuservalidation,
                userloginvalidation,
                usergetdatavalidation,
                changeuservalidation,
                changeuserpasswordvalidation,
                deleteuservalidation,
                markattendencevalidation,
                getattendencevalidation}

