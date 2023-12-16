import express from "express"
import { companyDetailModel } from "../model/companyDetail.js"


const router = express.Router()


// router.post("/get", async (req, res) => {
//     try {
//         const companyId = req.body.companyId;
//         const response = await companyDetailModel.findOne({ companyId });

//         if (response) {
//             res.status(200).json(response);
//         } else {
//             res.status(404).json({ message: "Company detail not found" });
//         }
//     } catch (error) {
//         res.status(400).json(error);
//     }
// });

router.post("/getall", async (req, res) => {
    try {
        const response = await companyDetailModel.find({})
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post("/new", async (req, res) => {
    try {
        const detail = new companyDetailModel(req.body)
        const response = await detail.save()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
})

export { router as companyDetailRouter }


// router.put("/update", verifyToken, async (req, res) => {
//     try {
//         const detail = await companyDetailModel.findById(req.body.companyId)
//         const user = await companyAuthModel.findById(req.body.companyDetailId)
//         user.savedRecipes.push(recipe)
//         await user.save()
//         res.status(200).json({ savedRecipes: user.savedRecipes })
//     } catch (error) {
//         res.status(400).json(error)
//     }
// })

// router.get("/savedRecipes/id/:userID", async (req, res) => {
//     try {
//         const user = await authModel.findById(req.params.userID)

//         res.status(200).json({ savedRecipes: user?.savedRecipes })
//     } catch (error) {
//         res.status(400).json(error)
//     }
// })
// router.get("/savedRecipes/:userID", async (req, res) => {
//     try {
//         const user = await authModel.findById(req.params.userID)
//         const savedRecipes = await companyDetailModel.find({
//             _id: { $in: user.savedRecipes }
//         })

//         res.status(200).json({ savedRecipes })
//     } catch (error) {
//         res.status(400).json(error)
//     }
// })



