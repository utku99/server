import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import { userAuthModel } from "../model/userauth.js"
import { companyAuthModel } from "../model/companyauth.js"

const router = express.Router()


router.post("/userregister", async (req, res) => {
    const { name, surname, phone, email, password, userroleid } = req.body
    const user = await userAuthModel.findOne({ email })

    if (user) {
        res.status(400).json({ msg: "user already exists" })
    }

    const hashedPass = await bcrypt.hash(password, 12)
    const newUser = new userAuthModel({ name, surname, phone, email, userroleid, password: hashedPass })
    await newUser.save()

    res.json({ code: 100, msg: "user registered" })
})

router.post("/companyregister", async (req, res) => {
    const { name, surname, phone, email, password, userroleid } = req.body
    const user = await companyAuthModel.findOne({ email })

    if (user) {
        res.status(400).json({ msg: "company already exists" })
    }

    const hashedPass = await bcrypt.hash(password, 12)
    const newUser = new companyAuthModel({ name, surname, phone, email, userroleid, password: hashedPass })
    await newUser.save()

    res.json({ code: 100, msg: "company registered" })
})



router.post("/userlogin", async (req, res) => {
    const { email, password } = req.body
    const user = await userAuthModel.findOne({ email })

    if (!user) {
        res.status(400).json({ msg: "user not found" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        res.status(400).json({ msg: "username or password is incorrect" })
    }

    const token = jwt.sign({ id: user._id }, "secret")

    res.json({
        code: 100,
        token,
        userId: user._id,
        userroleId: user.userroleid,
        name: user.name,
        surname: user.surname,
        phone: user.phone,
        email: user.email,
    })
})

router.post("/companylogin", async (req, res) => {
    const { email, password } = req.body
    const user = await companyAuthModel.findOne({ email })

    if (!user) {
        res.status(400).json({ msg: "user not found" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        res.status(400).json({ msg: "username or password is incorrect" })
    }

    const token = jwt.sign({ id: user._id }, "secret")

    res.json({
        code: 100,
        token,
        companyId: user._id,
        userroleId: user.userroleid,
        name: user.name,
        surname: user.surname,
        phone: user.phone,
        email: user.email,
    })
})




export { router as authRouter }