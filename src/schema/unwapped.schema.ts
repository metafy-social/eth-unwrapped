import { Schema, model } from "mongoose";

const unwappedSchema = new Schema({
    _id: String,
    nfts: {
        type: Number,
        default: 0,
    },
    tokens: {
        type: Number,
        default: 0,
    },
    contracts: {
        type: Number,
        default: 0,
    },
    oldest: {
        type: Object,
        default: null,
    },
    first_transaction_2022: {
        type: Number,
        default: null,
    },
    swaps: {
        type: Number,
        default: 0,
    },
    transactions: {
        type: Number,
        default: 0,
    },
    score: Number,
}, {
    timestamps: false,
    versionKey: false,
    collection: 'unwrapped',
});

export default model('Unwrapped', unwappedSchema);