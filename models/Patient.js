const {Schema , model} = require('mongoose')

const schema = new Schema({
    id : String ,
    fullname : String ,
    phone : String
} ,
{
    timestamps: true
})

module.exports = model('Patient' , schema)