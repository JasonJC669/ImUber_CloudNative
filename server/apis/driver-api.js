const Driver = require('../models/driver-model')

createDriver = async (Dname, Dphone) => {
    const driver = await Driver.create({
        name: Dname,
        phone: Dphone,

        passengerNumber: 0,
        passengerPhone: []
    })

    await driver.save()

    return driver
}

updateDriver = async (Dphone, Dtime, Droute) => {
    const driver = await Driver.findOne({phone: Dphone})

    driver.time = Dtime
    driver.route = Droute

    await driver.save()

    return driver
}

updatePassenger = async (Dphone, Pphone) => {
    const driver = await Driver.findOne({phone: Dphone})
    
    driver.passengerNumber++
    driver.passengerPhone.push(Pphone)

    await driver.save()
    
    return driver
}

getDriver = async (Dphone) => {
    return await Driver.findOne({phone: Dphone})
}

getAll = async () => {
    return await Driver.find()
}

module.exports = {
    createDriver,
    updateDriver,
    updatePassenger,
    getDriver,
    getAll
}