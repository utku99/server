import mongoose from "mongoose";

const companyOrdersSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    orders: [{
        id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
    }]

})

export const companyOrdersModel = mongoose.model(" companyorders", companyOrdersSchema)

