import { Schema, model } from 'mongoose';

const PersonSchema = new Schema({
    personName: {
        type: String,
        required: true,
        unique: true
    },
    debt_amount: {
        type: Number,
        default: 0
    },
    owes_amount: {
        type: Number,
        default: 0
    },
    debt_trans: [
        {
            debt_to: {
                type: String
            },
            amount: {
                type: Number
            }
        }
    ],
    owes_trans: [
        {
            owes_to: {
                type: String
            },
            amount: {
                type: Number
            }
        }
    ]
}, { timestamps: true });

export default model("Person", PersonSchema);
