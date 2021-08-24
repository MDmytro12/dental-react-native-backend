const express = require('express')
const cors = require('cors')
const {PatientCtrl , AppointmentCntrl} = require('./controllers')
const db = require('./core/db')
const patientValidation = require('./utils/validation/patient')
const appointmentValidation = require('./utils/validation/appointment')


const app = express()
 
app.use(cors({origin : "*"}))
app.use(express.json())
app.use(express.urlencoded( { extended : true } ))

const PORT = process.env.PORT || 5000

app.get('/patients' , PatientCtrl.all)
app.post('/patient' , patientValidation.create , PatientCtrl.create)
app.delete('/patient/:id' , PatientCtrl.remove)
app.patch('/patient' , patientValidation.create , PatientCtrl.update)
app.get('/patient/:id' , PatientCtrl.show)

app.get('/appointment' , AppointmentCntrl.all )
app.post('/appointment' , appointmentValidation.create , AppointmentCntrl.create)
app.delete('/appointment/:id' , AppointmentCntrl.remove)
app.patch('/appointment' , appointmentValidation.update , AppointmentCntrl.update)
 
app.listen( PORT , (err) => {
    if(err){
        console.log(err)
        return 
    }

    console.log(`Server runned on port : ${PORT}!`)
} )