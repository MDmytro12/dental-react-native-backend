const {Patient} = require('../models')
const {validationResult} = require('express-validator')

function PatientController () {}

const create = function (req , res) {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({message : 'Uncorrect data!' , errors })
    }

    const data = {
        fullname : req.body.fullname ,
        phone : req.body.phone
    }

    Patient.create( data , function (err , doc) {
        if(err){
            return res.status(500).json({message : "Mongoose problem!(Create patient!)"})
        }

        res.status(200).json({data : doc})
    })
}

const all = function (req ,res ) {
    Patient.find( {} , function (err , docs) {
        if(err){
            return res.status(500).json({message:'Mongoose problem!(All patient!)'})
        }

        res.status(200).json({data : docs})
    } )
}

const remove = async function (req , res) {
    const {id} = req.params

    try{
        const patientRemove = await Patient.find({_id : id })  

        await Patient.deleteOne({_id : id})

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
        fullname : req.body.fullname ,
        phone : req.body.phone
    }

    try{
        const patient = await Patient.findOne({_id : req.body._id})
    }catch(e){
        return res.status(500).json({message : "Such record of appointment doesnt exists!" , error :  e })
    }

    await Patient.updateOne({_id : req.body._id} , {$set : data} , function(err , doc){
        if(err){
            return res.status(500).json({message : "Error in moment of updating!"})
        }

        return res.status(200).json({data : doc})
    })

}

const show = async function(req , res){
    const {id} = req.params 
    
    try{
        const patient = await Patient.findById(id).populate('appointments').exec();

        return res.status(200).json({...patient._doc , appointments : patient.appointments })
    }catch(e){
        return res.status(400).json({message : 'This patient doesn`t exists!'})
    }
} 

PatientController.prototype = {create , all , remove , update , show}


module.exports = PatientController;