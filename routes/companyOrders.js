import express from "express"
import { companyOrdersModel } from "../model/companyOrders.js"


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

export { router as companyOrdersRouter }