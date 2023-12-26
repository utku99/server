import express from "express"
import { companyCommentsModel } from "../model/companyComments.js"


const router = express.Router()

router.post("/new", async (req, res) => {
    try {
        const detail = new companyCommentsModel(req.body)
        const response = await detail.save()
        res.status(200).json({ msg: "Yorum Yapıldı", response })
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post("/getall", async (req, res) => {
    try {
        const { companyId } = req.body
        const response = await companyCommentsModel.find({ companyId })
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
})


export { router as companyCommentsRouter }




