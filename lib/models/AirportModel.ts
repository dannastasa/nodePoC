import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const AirportSchema = new Schema({
    name: {
        type: String,
        required: 'Please enter the airport name'
    },
    city: {
        type: String,
        required: 'Please enter the airport city'       
    },
    country: {
        type: String,
        required: 'Please enter the airport country'
    },
    planeCapacity: {
        type: Number,
        required: 'Please enter the airport maximum plane capacity'
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});