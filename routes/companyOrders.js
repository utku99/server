import express from "express"
import { companyOrdersModel } from "../model/companyOrders.js"
import { companyDetailModel } from "../model/companyDetail.js"


const router = express.Router()



router.post("/getall", async (req, res) => {
    try {
        const { companyId } = req.body
        const response = await companyOrdersModel.find({ companyId })
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post("/new", async (req, res) => {
    try {
        const detail = new companyOrdersModel(req.body)
        const response = await detail.save()
        res.status(200).json({ msg: "Siparişi verdiniz", response })
    } catch (error) {
        res.status(400).json({ msg: "Sipariş Verirken Hata Oluştu", error })
    }
})

router.post("/getuserorder", async (req, res) => {
    try {
        const { userId } = req.body
        const response = await companyOrdersModel.find({ userId })
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post("/removeorder", async (req, res) => {
    try {
        const { orderId } = req.body;

        const response = await companyOrdersModel.findByIdAndRemove(orderId);

        if (!response) {
            return res.status(404).json({ msg: 'sipariş bulunamadı' });
        }

        res.status(200).json({ msg: 'sipariş silindi' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post("/changeorderstate", async (req, res) => {
    try {
        const { orderId, status } = req.body;

        const order = await companyOrdersModel.findById(orderId);

        if (!order) {
            return res.status(404).json({ msg: 'sipariş bulunamadı' });
        }

        order.status = status;
        await order.save();

        res.status(200).json({ msg: 'sipariş durumu değiştirildi' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// router.post("/gettablenumber", async (req, res) => {
//     try {
//         const { orderId, companyId } = req.body;

//         const order = await companyOrdersModel.findById(orderId);
//         const { capacity } = await companyDetailModel.findOne({ companyId });
//         const respo = await companyOrdersModel.find({ companyId });
//         let avaibleorders = respo.filter(item => item.status == "hazırlanıyor")
//         const awaibletablecount = Number(capacity) - avaibleorders?.length



//         res.status(200).json(awaibletablecount);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

export { router as companyOrdersRouter }