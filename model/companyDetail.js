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
    menu: [
        {
            companyId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "companyauth",
                required: true,
            },
            menu: [{
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
        }
    ],
    rank: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'userRating',
            },
            rating: {
                type: Number,
                default: 0
            },
        }
    ],

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});


companyDetailSchema.virtual('averageRating').get(function () {
    if (this.rank.length === 0) {
        return 0;
    }

    const sum = this.rank.reduce((total, rankItem) => total + rankItem.rating, 0);
    return sum / this.rank.length;
});

export const companyDetailModel = mongoose.model("companyDetail", companyDetailSchema)

