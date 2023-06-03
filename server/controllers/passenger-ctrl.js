const Passenger = require('../apis/passenger-api')
const PassengerDB = require('../models/passenger-model')

addPassenger = async (req, res) => {
    const Pname = req.body.name
    const Pphone = req.body.phone
    // console.log(req.body);
    console.log(Pname)
    console.log(Pphone)
    if (!req.body) {
        console.log("[p-ctrl] must provide a passenger")
        return res.status(400).json({
            success: false,
            error: 'You must provide a passenger',
        })
    }

    // const passenger = new Passenger(body)
    // Passenger.getPassenger(Pphone), (err, pass_exist) =>{
    await PassengerDB.findOne({phone: Pphone}, (err, pass_exist) =>{
        if (err) {
            console.log("[p-ctrl] get passenger error")
            console.log(err)
            return res.status(400).json({
                success: false,
                error: err
            })
        }
        else if (!pass_exist) {
            const pass_new = new PassengerDB({name: Pname, phone: Pphone})
            console.log(pass_new)
            if (!pass_new) {
                // return res.status(400).json({ success: false, error: err })
                console.log("[p-ctrl] not a paspassenger")
                return res.status(400).json({
                    error: "not a paspassenger",
                    success: false,
                    message: "not a paspassenger"
                })
            }
            else{
                pass_new.save()
                .then(() => {
                    console.log("[p-ctrl] save paspassenger success")
                    return res.status(201).json({
                        success: true,
                        id: pass_new._id,
                        data: pass_new,
                        message: 'paspassenger created success',
                    })
                })
                .catch(error => {
                    console.log("[p-ctrl] save paspassenger failed")
                    console.log(error)
                    return res.status(400).json({
                        success: true,
                        error: error,
                        message: 'paspassenger created faild',
                    })
                })
            }
        }
        else{
            console.log("Pname: " , Pname)
            console.log("Pphone: ", Pphone)
            console.log("(pass_exist.name: ", pass_exist.name)
            if(pass_exist.name == Pname){
                console.log("[p-ctrl] paspassenger (", pass_exist.name, ") login success")
                return res.status(201).json({
                    success: true,
                    id: pass_exist._id,
                    data: pass_exist,
                    message: 'paspassenger login success',
                })
            }
            else{
                console.log("[p-ctrl] passenger phone number already exist ", pass_exist.name)
                // console.log(pass_exist)
                return res.status(400).json({
                    error: 'passenger phone number already exist',
                    message: 'passenger phone number already exist',
                })
            }
            
        }
    })
}

module.exports = {
    addPassenger
}