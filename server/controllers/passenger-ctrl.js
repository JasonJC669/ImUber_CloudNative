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
                console.log("[p-ctrl] not a passenger")
                return res.status(400).json({
                    error: "not a passenger",
                    success: false,
                    message: "not a passenger"
                })
            }
            else{
                pass_new.save()
                .then(() => {
                    console.log("[p-ctrl] create passenger success")
                    return res.status(201).json({
                        success: true,
                        id: pass_new._id,
                        data: pass_new,
                        message: 'create passenger success',
                    })
                })
                .catch(error => {
                    console.log("[p-ctrl] create passenger failed")
                    console.log(error)
                    return res.status(400).json({
                        success: true,
                        error: error,
                        message: 'create passenger faild',
                    })
                })
            }
        }
        else{
            console.log("Pname: " , Pname)
            console.log("Pphone: ", Pphone)
            console.log("(pass_exist.name: ", pass_exist.name)
            if(pass_exist.name == Pname){
                console.log("[p-ctrl] passenger (", pass_exist.name, ") login success")
                return res.status(201).json({
                    success: true,
                    id: pass_exist._id,
                    data: pass_exist,
                    message: 'passenger login success',
                })
            }
            else{
                console.log("[p-ctrl] passenger (", pass_exist.name, ") phone number already exist")
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