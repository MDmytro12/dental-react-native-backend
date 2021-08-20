const {check} = require('express-validator')

const validation = {
    create : [
        check('dentNumber' , 'Uncorrect data!(Dent number)').isInt({min : 1 , max: 32}) ,
        check('diagnostic' , 'Uncorrect data!(Diagnostic.').isLength({min: 3 , max : 48}) ,
        check('price' , "Uncorrect data!(Price!)").isInt({min : 100 , max : 30000}),
        check('date' , 'Uncorrect data!(Date!)').isLength({min: 8 , max: 38}) ,
        check('time' , 'Uncorrect data!(Time!)').isLength({mim: 4 , max : 16}),
        check('patientId' , 'Uncorrect data!(Id!)').isLength({min : 3 , max : 48})
    ] ,
    update : [
        check('dentNumber' , "Uncorrect value to update!(Dent number!)").isInt({min : 1 , max : 32}),
        check('diagnostic' , "Unccorect value to update!(Diagnostic!)").isLength({min: 3 , max : 48}) ,
        check('price' , 'Uncorrect data value to update!(Price!)').isInt({min: 100 , max : 300000}) ,
        check('date' , 'Uncorrect value to update!(Date!)').isLength({min : 3 , max: 38}),
        check('time' , 'Unccorect value to update!(Time)').isLength({min: 2 , max : 38}) 
    ]
}

module.exports = validation