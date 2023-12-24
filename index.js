import express from "express"
import cors from "cors"

import db from "./database/db.js"
import { authRouter } from "./routes/auth.js"
import { companyDetailRouter } from "./routes/companyDetail.js"
import { companyRankRouter } from "./routes/rating.js"
import bodyParser from "body-parser"
import { companyOrdersRouter } from "./routes/companyOrders.js"

const app = express()
app.use(cors())
app.use(express.json())

app.use("/auth", authRouter)
app.use("/detail", companyDetailRouter)
app.use("/company", companyRankRouter)
app.use("/order", companyOrdersRouter)


app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({ limit: '50mb' }));



db()

const PORT = 3000

app.listen(PORT, () => {
    console.log("server running on port ", PORT);
})