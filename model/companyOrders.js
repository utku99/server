import mongoose from "mongoose";

const companyOrdersSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    tableId: {
        type: String,
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
        enum: ["bekliyor", "hazırlanıyor", "tamamlandı", "iptal edildi", "güncellendi"],
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

// companyOrdersSchema.pre('save', async function (next) {
//     const companyDetail = await mongoose.model("companyDetail").findOne({ companyId: this.companyId });
//     const companyOrders = await companyOrdersModel.find({ companyId: this.companyId, status: "hazırlanıyor" });

//     if (!companyDetail) {
//         console.log("CompanyDetail not found for companyId:", this.companyId);
//         return next();
//     }

//     const capacityy = companyDetail.capacity;

//     const availableTableCount = Number(capacityy) - companyOrders?.length;

//     if (availableTableCount > 0) {
//         this.tableId = availableTableCount.toString();
//         await this.save()
//     } else {
//         console.log("No available tables for order:");
//     }

//     next();
// });




export const companyOrdersModel = mongoose.model(" companyorders", companyOrdersSchema)



