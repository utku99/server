import mongoose, { mongo } from "mongoose";


const companyDetailSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "companyauth",
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    latitude: {
        type: String,
        required: true,
    },
    longitude: {
        type: String,
        required: true,
    },
    capacity: {
        type: String,
        required: true,
    },
    menu: [{
        type: String,
        required: true
    }],
    rank: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userRating',
        },
    ],

})

companyDetailSchema.virtual('averageRating').get(function () {
    if (this.rank.length === 0) {
        return 0;
    }

    const totalRating = this.rank.reduce((sum, rating) => sum + rating.rating, 0);
    return totalRating / this.rank.length;
});


export const companyDetailModel = mongoose.model("companyDetail", companyDetailSchema)

