const DriverDB = require('../models/driver-model')
const PassengerDB = require('../models/passenger-model')
createGroup = async (req, res) => {
    const Dname = "Max"
    const Dphone = "0900000000"
    // const Dphone = req.body.phone
    // const Dplaces = req.body.places
    const Dplaces = [
        {
          name: 'Place 1',
          latitude: 123.456,
          longitude: 78.9,
        },
        {
          name: 'Place 2',
          latitude: 12.345,
          longitude: 67.89,
        },
      ];
    console.log("body: ", req.body)
    console.log(Dphone)
    if (!req.body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide driver phone and group places',
        })
    }
    await DriverDB.findOne({ phone: Dphone }, (err, driver_exist) => {
        if (err) {
            console.log("[g-ctrl-create] get driver error")
            console.log(err)
            return res.status(400).json({
                success: false,
                error: err
            })
        }
        else if (driver_exist) {
            driver_exist.places = Dplaces
            driver_exist.save()
                .then(() => {
                    console.log("[g-ctrl-create] save group success")
                    console.log(driver_exist)
                    return res.status(201).json({
                        success: true,
                        id: driver_exist._id,
                        data: driver_exist,
                        message: 'group created success',
                    })
                })
                .catch(error => {
                    console.log("[g-ctrl-create] create group failed")
                    console.log(error)
                    return res.status(400).json({
                        success: true,
                        error: error,
                        message: 'group created faild',
                    })
                })
        }
        else {
            console.log("[g-ctrl-create] driver not exist")
            // console.log(driver_exist)
            return res.status(400).json({
                error: 'driver not exist',
                message: 'driver not exist',
            })
        }
    })
}
getGroup = async (req, res) => {
    const Dname = req.body.name
    const Dphone = req.body.phone
    console.log("body: ", req.body)
    console.log(Dphone)
    if (!req.body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide driver phone',
        })
    }
    await DriverDB.findOne({ phone: Dphone, name: Dname }, (err, driver_exist) => {
        if (err) {
            console.log("[g-ctrl-get] get driver error")
            console.log(err)
            return res.status(400).json({
                success: false,
                error: err
            })
        }
        else if (driver_exist) {

            console.log("[g-ctrl-get] get group success")
            console.log(driver_exist)
            return res.status(201).json({
                success: true,
                id: driver_exist._id,
                data: driver_exist,
                message: 'get group success',
            })
        }
        else {
            console.log("[g-ctrl-get] greoup not exist")
            // console.log(driver_exist)
            return res.status(400).json({
                error: 'greoup not exist',
                message: 'greoup not exist',
            })
        }
    })
}

joinGroup = async (req, res) => {
    // const Pname = req.body.Pname
    // const Pphone = req.body.Pphone
    // const Dname = req.body.Dname
    // const Dphone = req.body.Dphone
    // const Dplaces = req.body.places

    const Pname = "FAN"
    const Pphone = "0930090502"
    const Dname = "Max"
    const Dphone = "0900000000"
    
    const Dplaces = [
        {
          name: 'Place 1',
          latitude: 123.456,
          longitude: 78.9,
        },
        {
          name: 'Place 2',
          latitude: 12.345,
          longitude: 67.89,
        },
      ];
    
    console.log(req.body)
    if (!req.body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide driver phone and group places',
        })
    }
    await DriverDB.findOne({phone: Dphone}, (err, driver_exist) =>{
        if (err) {
            console.log("[g-ctrl-join] get driver error")
            console.log(err)
            return res.status(400).json({
                success: false,
                error: err
            })
        }
        else if (driver_exist) {
            driver_exist.places = Dplaces
            driver_exist.save()
            .then(() => {
                console.log("[g-ctrl-create] save group success")
                console.log(driver_exist)
                return res.status(201).json({
                    success: true,
                    id: driver_exist._id,
                    data: driver_exist,
                    message: 'group created success',
                })
            })
            .catch(error => {
                console.log("[g-ctrl-create] create group failed")
                console.log(error)
                return res.status(400).json({
                    success: true,
                    error: error,
                    message: 'group created faild',
                })
            })
        }
        else{
            console.log("[g-ctrl-create] driver not exist")
            // console.log(driver_exist)
            return res.status(400).json({
                error: 'driver not exist',
                message: 'driver not exist',
            })
        }
    })
}
module.exports = {
    createGroup,
    getGroup,
}