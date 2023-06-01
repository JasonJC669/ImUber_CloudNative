const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Driver = new Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },

        time: [String],
        route: { type: [{String, Decimal128, Decimal128}] },
        
        passengerNumber: { type: Number, required: true, min: 0, max: 4 },
        passengerPhone: { type: [String], required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('drivers', Driver)