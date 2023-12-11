import { recipModel } from "../model/recipe.js"
import express from "express"
import mongoose from "mongoose"

import { authModel } from "../model/auth.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()



router.get("/", async (req, res) => {
    try {
        const response = await recipModel.find({})
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
})
router.post("/", verifyToken, async (req, res) => {
    try {
        const recipe = new recipModel(req.body)
        const response = await recipe.save()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
})
router.put("/", verifyToken, async (req, res) => {
    try {
        const recipe = await recipModel.findById(req.body.recipeID)
        const user = await authModel.findById(req.body.userID)
        user.savedRecipes.push(recipe)
        await user.save()
        res.status(200).json({ savedRecipes: user.savedRecipes })
    } catch (error) {
        res.status(400).json(error)
    }
})
router.get("/savedRecipes/id/:userID", async (req, res) => {
    try {
        const user = await authModel.findById(req.params.userID)

        res.status(200).json({ savedRecipes: user?.savedRecipes })
    } catch (error) {
        res.status(400).json(error)
    }
})
router.get("/savedRecipes/:userID", async (req, res) => {
    try {
        const user = await authModel.findById(req.params.userID)
        const savedRecipes = await recipModel.find({
            _id: { $in: user.savedRecipes }
        })

        res.status(200).json({ savedRecipes })
    } catch (error) {
        res.status(400).json(error)
    }
})




export { router as recipeRouter }