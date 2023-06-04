const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Decimal128 = Schema.Types.Decimal128;

const Driver = new Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },

        time: [String],
        // route: { type: [{String, Decimal128, Decimal128}] },
        places: {
            type: [
                {
                    name: { type: String },
                    latitude: { type: Number },
                    longitude: { type: Number },
                },
            ],
        },
        // passenger: [
        //     {
        //         name: { type: String },
        //         phone: { type: String },
        //     },
        // ],
        // passengerNumber: { type: Number, required: false, min: 0, max: 4 },
        // passengerPhone: { type: [String], required: false },
    },
    { timestamps: true },
)

module.exports = mongoose.model('drivers', Driver)