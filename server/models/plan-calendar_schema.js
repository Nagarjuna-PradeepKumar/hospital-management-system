const mongoose=require('mongoose')

const plancalendar = new mongoose.Schema({
    yearmonth:{type:String,required:true},
    workingdays:[{type:String}],
    holidays:[{type:String}],
})

module.exports= mongoose.model('workingdays',plancalendar)