const {Schema , model} = require('mongoose')

const schema = new Schema({
    patientId : {type: Schema.Types.ObjectId , ref : 'Patient'}, 
    dentNumber : Number ,
    diagnostic : String ,
    price : Number ,
    date : String ,
    time : String
} , {
    timestamps : true
})


module.exports = model('Appointment' , schema) 