const DriverDB = require('../models/driver-model')

addDriver = async (req, res) => {
  const Dname = req.body.name
  const Dphone = req.body.phone
  // console.log(req.body);
  console.log(Dname)
  console.log(Dphone)
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a dirver',
    })
  }
  await DriverDB.findOne({ phone: Dphone }, (err, driver_exist) => {
    if (err) {
      console.log("[d-ctrl-add] get passenger error")
      console.log(err)
      return res.status(400).json({
        success: false,
        error: err
      })
    }
    else if (!driver_exist) {
      const driver_new = new DriverDB({ name: Dname, phone: Dphone })
      console.log(driver_new)
      if (!driver_new) {
        // return res.status(400).json({ success: false, error: err })
        console.log("[d-ctrl-add] not a driver")
        return res.status(400).json({
          error: "not a driver",
          success: false,
          message: "not a driver"
        })
      }
      else {
        driver_new.save()
          .then(() => {
            console.log("[d-ctrl-add] create driver success")
            return res.status(201).json({
              success: true,
              id: driver_new._id,
              data: driver_new,
              message: 'driver created success',
            })
          })
          .catch(error => {
            console.log("[d-ctrl-add] create driver failed")
            console.log(error)
            return res.status(400).json({
              success: true,
              error: error,
              message: 'driver created faild',
            })
          })
      }
    }
    else {
      if (driver_exist.name == Dname) {
        console.log("[d-ctrl-add] driver (", driver_exist.name, ") login success")
        return res.status(201).json({
          success: true,
          id: driver_exist._id,
          data: driver_exist,
          message: 'driver login success',
        })
      }
      else {
        console.log("[d-ctrl-add] driver (", driver_exist.name, ") phone number already exist")
        // console.log(driver_exist)
        return res.status(201).json({
          success: false,
          error: 'driver phone number already exist',
          message: 'driver phone number already exist',
        })
      }

    }
  })
}
module.exports = {
  addDriver,
}