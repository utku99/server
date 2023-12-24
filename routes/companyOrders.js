import express from "express"
import { companyOrdersModel } from "../model/companyOrders.js"


const router = express.Router()



router.post("/getall", async (req, res) => {
    try {
        const response = await companyOrdersModel.find({})
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post("/new", async (req, res) => {
    try {
        const detail = new companyOrdersModel(req.body)
        const response = await detail.save()
        res.status(200).json("Siparişi Verdiniz")
    } catch (error) {
        res.status(400).json(error)
    }
})

export { router as companyOrdersRouter }