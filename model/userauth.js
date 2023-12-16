import mongoose from "mongoose";


const userAuthSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userroleid: {
        type: String,
        required: true
    },
})


export const userAuthModel = mongoose.model("userauth", userAuthSchema)

