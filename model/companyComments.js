import mongoose from "mongoose";

const companyCommentsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
})


export const companyCommentsModel = mongoose.model(" companycomments", companyCommentsSchema)

