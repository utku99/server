import mongoose from "mongoose";

const companyCommentsSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
})


export const companyCommentsModel = mongoose.model(" companycomments", companyCommentsSchema)

