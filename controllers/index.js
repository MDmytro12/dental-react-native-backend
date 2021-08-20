const PatientController = require('./PatientController') 
const AppointmentController = require('./AppointmentController') 

module.exports = {
    PatientCtrl: new PatientController() ,
    AppointmentCntrl : new AppointmentController()
}