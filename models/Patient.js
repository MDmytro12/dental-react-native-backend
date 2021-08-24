const {Schema , model} = require('mongoose')

const schema = new Schema({
    id : String ,
    fullname : String ,
    phone : String
} ,
{
    timestamps: true
})

schema.virtual('appointments' , {
    ref : "Appointment" ,
    localField : '_id' ,
    foreignField : "patientId",
    justOne : false
})

module.exports = model('Patient' , schema)