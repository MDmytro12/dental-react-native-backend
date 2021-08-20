const {check} = require('express-validator')

const validation = {
    create : [
        check('fullname' , 'Fullname is uncorrect!').isLength({min: 3}) ,
        check('phone' , 'Phone number is uncorrect!').isLength({min:12})
    ]
}

module.exports = validation;