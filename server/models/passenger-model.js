const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Passenger = new Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },

        destination: {String, Decimal128, Decimal128},

        driverNumber: String,
        time: [String],
        location: {String, Decimal128, Decimal128},
    },
    { timestamps: true },
)

module.exports = mongoose.model('passengers', Passenger)