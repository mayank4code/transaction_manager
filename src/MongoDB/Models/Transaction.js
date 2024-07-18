import { Schema, model } from 'mongoose';

const TransactionSchema = new Schema({
    A: {
        type: String,
        required: true
    },
    B: {
        type: String,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export default model("Transaction", TransactionSchema);
