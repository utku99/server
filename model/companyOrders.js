import mongoose from "mongoose";

const companyOrdersSchema = new mongoose.Schema({
    userId: {
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
    }],
    status: {
        type: String,
        enum: ["hazırlanıyor", "tamamlandı", "iptal edildi"],
        default: "hazırlanıyor",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    remainingTime: {
        type: Number,
        default: 30
    }

})

companyOrdersSchema.pre('save', function (next) {
    const order = this;

    if (order.remainingTime <= 0) {
        order.status = 'iptal edildi';
        return next();
    }

    const countdownInterval = setInterval(() => {
        order.remainingTime -= 1;

        if (order.remainingTime <= 0) {
            order.status = 'iptal edildi';
            clearInterval(countdownInterval);
        }

        order.save()
            .then(() => {
            })
            .catch((error) => {
                clearInterval(countdownInterval);
                return next(error);
            });
    }, 60000);

    next();
});



export const companyOrdersModel = mongoose.model(" companyorders", companyOrdersSchema)

