import mongoose from "mongoose";

const companyAuthSchema = new mongoose.Schema({
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
    companyDetailId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "companyDetail",
    },
})

export const companyAuthModel = mongoose.model("companyauth", companyAuthSchema)

