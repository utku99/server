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
        enum: ["bekliyor", "hazırlanıyor", "tamamlandı", "iptal edildi"],
        default: "bekliyor",
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

// Cache devre dışı bırakma kodu
companyOrdersSchema.set('toObject', { getters: true });
companyOrdersSchema.set('toJSON', { getters: true });

companyOrdersSchema.pre('save', async function (next) {
    if (this.isModified('status') && this.status === 'hazırlanıyor') {
        const countdownFunction = async () => {
            const countdown = setInterval(async () => {
                this.remainingTime -= 1;
                if (this.remainingTime <= 0) {
                    this.status = "iptal edildi";
                    clearInterval(countdown);
                }
                await this.save();
            }, 1000);
        };

        countdownFunction();
    }

    next();
});




export const companyOrdersModel = mongoose.model(" companyorders", companyOrdersSchema)

