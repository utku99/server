import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import { authModel } from "../model/auth.js"

const router = express.Router()


router.post("/register", async (req, res) => {
    const { email, password } = req.body
    const user = await authModel.findOne({ email })

    if (user) {
        res.status(400).json({ msg: "user already exists" })
    }

    const hashedPass = await bcrypt.hash(password, 12)
    const newUser = new authModel({ email, password: hashedPass })
    await newUser.save()

    res.json({ msg: "user registered" })
})



router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const user = await authModel.findOne({ email })

    if (!user) {
        res.status(400).json({ msg: "user not found" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        res.status(400).json({ msg: "username or password is incorrect" })
    }

    const token = jwt.sign({ id: user._id }, "secret")

    res.json({
        token,
        userID: user._id
    })
})




export { router as authRouter }