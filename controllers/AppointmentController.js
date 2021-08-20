const {Appointment , Patient} = require('../models')
const {validationResult} = require('express-validator')

function AppointmentController() {}

const create = function (req , res) {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({message : 'Unccorect appointment data' , errors })
    }

    const data = {
        patientId : req.body.patientId ,
        dentNumber : req.body.dentNumber ,
        diagnostic : req.body.diagnostic ,
        price : req.body.price ,
        date : req.body.date ,
        time : req.body.time
    }

    Appointment.create( data , function (err, doc) {
            if(err){
                return res.status(500).json({message : 'Cannot create a new appointment!' , err})
            }

            res.status(200).json({data:doc})
    } )

}

const all = function(req , res) {
     Appointment.find({})
                .populate('patientId')
                .exec(function (err , doc){
                    if(err){
                        return res.status(500).json({message : "Error on get appointments!" , err})
                    }

                    res.json({
                        data : doc
                    })
                });
}

const remove = async function (req , res) {
    const {id} = req.params

    try{
        const removeAppointment = await Appointment.find({_id : id })  

        await Appointment.deleteOne({_id : id})

        return res.status(200).json({id})
    }catch(e){
        return res.status(500).json({message : e})
    }
}

const update = async function (req , res) {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(500).json({ errors , message : 'Cannot update item!'})
    }

    const data = {
        dentNumber : req.body.dentNumber, 
        diagnostic : req.body.diagnostic ,
        price : req.body.price ,
        date : req.body.date ,
        time : req.body.time
    }

    try{
        const appointment = await Appointment.findOne({_id : req.body._id})
    }catch(e){
        return res.status(500).json({message : "Such record of appointment doesnt exists!" , error :  e })
    }

    await Appointment.updateOne({_id : req.body._id} , {$set : data} , function(err , doc){
        if(err){
            return res.status(500).json({message : "Error in moment of updating!"})
        }

        return res.status(200).json({data : doc})
    })

}

AppointmentController.prototype = {create , all , remove , update}

module.exports = AppointmentController;