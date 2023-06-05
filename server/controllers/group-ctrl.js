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
    console.log(req.body)
    const Pname = "Max"
    const Pphone = "0900000000"
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
    
    // console.log(req.body)
    if (!req.body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide driver phone and group places',
        })
    }
    try {
        const driver_exist = await DriverDB.findOne({ phone: Dphone }).exec();
        if (!driver_exist) {
            console.log("[g-ctrl-join] driver not exist");
            return res.status(400).json({
                error: 'driver not exist',
                message: 'driver not exist',
            });
        }
    
        const pass_exist = await PassengerDB.findOne({ phone: Pphone }).exec();
        if (!pass_exist) {
            console.log("[g-ctrl-join] passenger not exist");
            return res.status(400).json({
                error: 'passenger not exist',
                message: 'passenger not exist',
            });
        }
        console.log(driver_exist);
        console.log(pass_exist);
        if(driver_exist.places.length > 4){
            console.log("[g-ctrl-join] no seat");
            return res.status(400).json({
                error: 'no seat',
                message: 'no seat',
            });
        }
        else if(pass_exist.dirver){
            console.log("[g-ctrl-join] passenger already join a group");
            return res.status(400).json({
                error: 'passenger already join a group',
                message: 'passenger already join a group',
            });
        }
        else {
            driver_exist.passenger.concat({name: Pname, phone: Pphone})
            const driverData ={
                name: { type: String },
                phone: { type: String},
            }
            driverData.name = driver_exist.name
            driverData.phone = driver_exist.phone
            PassengerDB.updateOne({ _id: pass_exist._id }, { driver: driverData })
                .then(() => {
                console.log("Driver updated for the passenger successfully.");
                })
                .catch(error => {
                console.error("Error updating driver for the passenger:", error);
                });
            // pass_exist.set('driver', {
            //     name: driver_exist.name,
            //     phone: driver_exist.phone,
            // });
            const pass_exist2 = await PassengerDB.findOne({  _id: pass_exist._id }).exec();
            driver_exist.save()
                .then(() => {
                    console.log("[g-ctrl-join] driver save success");
                })
            console.log("===========")
            console.log("===========")
            console.log("driverData: ", driverData)
            console.log("driver_exist.name: ", driver_exist.name)
            console.log("driver_exist.phone: ", driver_exist.phone)
            console.log("pass_exist2: ", pass_exist2.driver)
            console.log("===========")
            console.log("===========")
            
            // pass_exist.dirver.name = driver_exist.name
            // pass_exist.dirver.phone = driver_exist.phone

            
            // pass_exist.save()
            // .then(() => {
            //     console.log("[g-ctrl-join] passenger save success");
            // })
        }

    } catch (error) {
        console.log("[g-ctrl-join] error", error);
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
    
}
module.exports = {
    createGroup,
    getGroup,
    joinGroup,
}