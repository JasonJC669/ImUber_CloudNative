const DriverDB = require('../models/driver-model')
const PassengerDB = require('../models/passenger-model')
createGroup = async (req, res) => {
   
    const Dphone = req.body.phone
    const Dplaces = req.body.places
    const Dtime = req.body.deparetTime
    // const Dname = "Max"
    // const Dphone = "0900000000"
    // const Dtime = "Tue Jun 06 2023 19:42:33 GMT+0800 (台北標準時間)"
    // const Dplaces = {
    //     name: 'Place 1',
    //       latitude: 999999,
    //       longitude: 999999,
    // }
    console.log("[g-ctrl-create] body: ", req.body)
    console.log("[g-ctrl-create] Dphone: ", Dphone)
    console.log("[g-ctrl-create] Dplaces: ", Dplaces)
    console.log("[g-ctrl-create] Dphone: ", Dtime)
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
            DriverDB.updateOne({ _id: driver_exist._id }, { deparetTime: Dtime, places: Dplaces  })
                .then(() => {
                    // const driver_test = await DriverDB.findOne({ phone: Dphone }).exec();
                    console.log("[g-ctrl-create] group updated time and places");
                    return res.status(201).json({
                        success: true,
                        id: driver_exist._id,
                        data: driver_exist,
                        message: 'group created success',
                    })
                })
                .catch(error => {
                    console.error("[g-ctrl-create] group updated time error:", error);
                    return res.status(400).json({
                        success: true,
                        error: error,
                        message: 'group created faild',
                    })
                });
            // driver_exist.places = Dplaces
            // driver_exist.save()
            //     .then(() => {
            //         console.log("[g-ctrl-create] save group success")
            //         console.log(driver_exist)
            //         return res.status(201).json({
            //             success: true,
            //             id: driver_exist._id,
            //             data: driver_exist,
            //             message: 'group created success',
            //         })
            //     })
            //     .catch(error => {
            //         console.log("[g-ctrl-create] create group failed")
            //         console.log(error)
            //         return res.status(400).json({
            //             success: true,
            //             error: error,
            //             message: 'group created faild',
            //         })
            //     })
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
    // const driver_update = await DriverDB.findOne({ phone: Dphone }).exec();
    // console.log("[g-ctrl-create] DEBUG driver_update")
    // console.log(driver_update)
}
getGroup = async (req, res) => {
    // const Dname = req.body.name
    const Dphone = req.body.phone
    console.log("[g-ctrl-get] body: ", req.body)
    console.log("[g-ctrl-get] Dphone", Dphone)
    if (!req.body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide driver phone',
        })
    }
    await DriverDB.findOne({ phone: Dphone }, (err, driver_exist) => {
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
            console.log("[g-ctrl-get] group not exist")
            // console.log(driver_exist)
            return res.status(400).json({
                error: 'group not exist',
                message: 'group not exist',
            })
        }
    })
}
passengerGetGroup = async (req, res) => {
    // const Dname = req.body.name
    const Pphone = req.body.phone
    console.log("[g-ctrl-passGetGroup] body: ", req.body)
    console.log("[g-ctrl-passGetGroup] Pphone", Pphone)
    if (!req.body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide passenger phone',
            message: 'You must provide passenger phone',
        })
    }
    try {
        const pass_exist = await PassengerDB.findOne({ phone: Pphone }).exec();
        if (!pass_exist) {
            console.log("[g-ctrl-passGetGroup] passenger not exist");
            return res.status(400).json({
                success: false,
                error: 'passenger not exist',
                message: 'passenger not exist',
            });
        }
        const driver_exist = await DriverDB.findOne({ phone: pass_exist.driver.phone }).exec();
        if (!driver_exist) {
            console.log("[g-ctrl-passGetGroup] passenger not join a group");
            return res.status(400).json({
                success: false,
                error: 'passenger not join a group',
                message: 'passenger not join a group',
            });
        }
        else {
            console.log("[g-ctrl-passGetGroup] passenger get group success")
            return res.status(201).json({
                success: true,
                id: driver_exist._id,
                data: driver_exist,
                message: 'passenger get group success',
            })
        }

    } catch (error) {
        console.log("[g-ctrl-passGetGroup] error", error);
    }
}

joinGroup = async (req, res) => {
    const Pname = req.body.Pname
    const Pphone = req.body.Pphone
    const Dname = req.body.Dname
    const Dphone = req.body.Dphone
    const Dplaces = req.body.places
      console.log("[g-ctrl-join] body: ", req.body)
      console.log("[g-ctrl-join] Pphone: ", Pphone)
      console.log("[g-ctrl-join] Dphone: ", Dphone)
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
        for (let i = 0; i < driver_exist.passenger.length; i++) {
            if (driver_exist.passenger.phone == pass_exist.phone) {
                console.log("[g-ctrl-join] passenger already join group");
                return res.status(400).json({
                    error: 'passenger already join group ',
                    message: 'passenger already join group',
                });
            }
        }
        if (driver_exist.passenger.length >= 4) {
            console.log("[g-ctrl-join] group no seat");
            return res.status(400).json({
                error: 'group no seat',
                message: 'group no seat',
            });
        }

        // else if(pass_exist.driver && Object.keys(pass_exist.driver).length > 0){
        //     console.log("[g-ctrl-join] passenger already join a group");
        //     return res.status(400).json({
        //         error: 'passenger already join a group',
        //         message: 'passenger already join a group',
        //     });
        // }
        else {
            const driverData ={
                name: { type: String },
                phone: { type: String },
            }
            driverData.name = driver_exist.name
            driverData.phone = driver_exist.phone
            PassengerDB.updateOne({ _id: pass_exist._id }, { driver: driverData })
                .then(() => {
                    console.log("[g-ctrl-join] Driver updated for the passenger successfully.");
                })
                .catch(error => {
                    console.error("[g-ctrl-join] Error updating driver for the passenger:", error);
                });
            const temp_passenger = driver_exist.passenger
            temp_passenger.push({name: pass_exist.name, phone: pass_exist.phone})
            // console.log("temp_passenger: ", temp_passenger)
            driver_exist.passenger = temp_passenger
            driver_exist.save()
                .then(() => {
                    console.log("[g-ctrl-join] driver save success");
                })

            const driver_update = await DriverDB.findOne({ _id: driver_exist._id }).exec();
            // console.log("driver_exist: ", driver_exist)
            console.log("driver_update: ", driver_update)
            // console.log("===========")
            // console.log("===========")
            // console.log("driverData: ", driverData)
            // console.log("driver_exist.name: ", driver_exist.name)
            // console.log("driver_exist.phone: ", driver_exist.phone)
            // console.log("pass_exist2: ", pass_exist2.driver)
            // console.log("===========")
            // console.log("===========")
            return res.status(201).json({
                success: true,
                id: driver_exist._id,
                data: driver_exist,
                message: 'join group success',
            })
        }

    } catch (error) {
        console.log("[g-ctrl-join] error", error);
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }

}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const radLat1 = toRadians(lat1);
    const radLon1 = toRadians(lon1);
    const radLat2 = toRadians(lat2);
    const radLon2 = toRadians(lon2);

    const dLon = radLon2 - radLon1;
    const dLat = radLat2 - radLat1;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = 6371 * c;

    return distance;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function compareTime(targetTime) {
    // var t = "Tue Jun 06 2023 08:42:33 GMT+0800 (台北標準時間)"
    // var now = new Date(t);
    var now = new Date();
    var currentTime = now.getTime();

    var targetTime = new Date(targetTime);
    var targetTimeValue = targetTime.getTime();
    // console.log("[g-ctrl-compareTime] currentTime: ", currentTime);
    // console.log("[g-ctrl-compareTime] targetTimeValue: ", targetTimeValue);
    return targetTimeValue > currentTime;
}
getNearGroups = async (req, res) => {
    const Pname = req.body.name
    const Pphone = req.body.phone
    const Plat = req.body.latitude
    const Plon = req.body.longitude
    // const Plat = 123.456
    // const Plon = 78.9
    console.log("body: ", req.body)
    console.log("Plat: ", Plat)
    console.log("Plon: ", Plon)
    // const place = req.body.name
    // var newgroup = {
    //         driver_name: { type: String},
    //         driver_phone: { type: String},

    //         time: [{ type: String}],
    //         places: [
    //             {
    //                 name: { type: String },
    //                 latitude: { type: Number },
    //                 longitude: { type: Number },
    //             },

    //         ],
    //         passenger: [
    //             {
    //                 name: { type: String },
    //                 phone: { type: String },
    //             },
    //         ],
    //     }
    // const place = {
    //     name: 'Place 1',
    //       latitude: 123.451,
    //       longitude: 78.3,
    // }
    try {
        const filteredGroups = [];
        const groups = await DriverDB.find({}).exec();
        if (groups.length == 0) {
            console.log("[g-ctrl-getNear] there is no driver in DB");
            return res.status(400).json({
                success: false,
                error: 'there is no driver DB',
                message: 'there is no driver DB'
            })
        }
        // console.log("groups length: ", groups.length);
        for (let i = 0; i < groups.length; i++) {
            // console.log("gorup: ", i, groups[i]);
            if(groups[i].places.length > 0){
                console.log("[g-ctrl-getNear] compareTime: ", compareTime(groups[i].deparetTime));
                if(compareTime(groups[i].deparetTime)){
                    for (let j = 0; j < groups[i].places.length; j++) {
                        console.log("dis:", calculateDistance(Plat, Plon,
                            groups[i].places[j].latitude,
                            groups[i].places[j].longitude));
                        if(calculateDistance(Plat, Plon,
                            groups[i].places[j].latitude,
                            groups[i].places[j].longitude) <= 1){
                                console.log("====== [FIND] =====");
                                console.log("groups: ", groups[i]);
                                filteredGroups.push(groups[i])
                                break;
                        
                        }
                    }
                }
            }
        }
        if (filteredGroups.length > 0) {
            console.log("[g-ctrl-getNear] find near group success");
            // const filteredGroups_changeName = [];
            // for (let i = 0; i < filteredGroups.length; i++) {
            // newgroup.driver_name = filteredGroups[i].name
            // newgroup.driver_phone = filteredGroups[i].phone
            // newgroup.time = filteredGroups[i].time
            // newgroup.places = filteredGroups[i].places
            // newgroup.passenger = filteredGroups[i].passenger
            // filteredGroups_changeName.push(newgroup)
            // console.log("filteredGroups: ", i, filteredGroups[i]);
            // console.log("filteredGroups_changeName: ", i, filteredGroups_changeName[i]);
            // }
            return res.status(201).json({
                success: true,
                data: filteredGroups,
                message: 'find near group success',
            })
        }
        else {
            console.log("[g-ctrl-getNear] find near group failed");
            return res.status(201).json({
                success: true,
                data: filteredGroups,
                message: "find near group failed"
            })
        }
        // console.log("====== [DEBUG] =====");
        // console.log("== filteredGroups ==");
        // console.log("====================");
        // for (let i = 0; i < filteredGroups.length; i++) {
        //     console.log("filteredGroups: ", i, filteredGroups[i]);
        // }
    } catch (error) {
        console.log("[g-ctrl-getNear] error", error);
    }
    // const distance = calculateDistance(25.0478, 121.5318, 40.7128, -74.0060);
    // console.log("distance", distance);

}

module.exports = {
    createGroup,
    getGroup,
    joinGroup,
    getNearGroups,
    passengerGetGroup,
}