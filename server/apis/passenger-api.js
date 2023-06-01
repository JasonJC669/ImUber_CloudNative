const Passenger = require('../models/passenger-model')

createPassenger = async (Pname, Pphone) => {
    const passenger = await Passenger.create({
        name: Pname,
        phone: Pphone
    })

    await passenger.save()

    return passenger
}

updatePassenger = async (Pphone, Pdestination) => {
    const passenger = await Passenger.findOne({phone: Pphone})

    passenger.destination = Pdestination

    await passenger.save()

    return passenger
}

updateDriver = async (Pphone, Dphone, Ptime, Plocation) => {
    const passenger = await Passenger.findOne({phone: Pphone})

    passenger.driverNumber = Dphone
    passenger.time = Ptime
    passenger.location = Plocation

    await passenger.save()

    return passenger
}

getPassenger = async (Pphone) => {
    return await Passenger.findOne({phone: Pphone})
}

module.exports = {
    createPassenger,
    updatePassenger,
    updateDriver,
    getPassenger
}