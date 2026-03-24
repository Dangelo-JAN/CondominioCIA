import mongoose from 'mongoose'
import { Schema } from "mongoose"

const ContactSalesSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    companyname: {
        type: String,
        required: true
    },
    companysize: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    workemail: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email address format, please enter a valid email address',
        }
    },
}, { timestamps: true })

export const ContactSales = mongoose.model("ContactSales", ContactSalesSchema)
