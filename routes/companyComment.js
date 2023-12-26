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

router.post("/getuser", async (req, res) => {
    try {
        const { userId } = req.body
        const response = await companyCommentsModel.find({ userId })
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
})


export { router as companyCommentsRouter }




