import express from "express"
import cors from "cors"

import db from "./database/db.js"
import { authRouter } from "./routes/auth.js"
import { recipeRouter } from "./routes/recipe.js"



const app = express()
app.use(cors())
app.use(express.json())

app.use("/auth", authRouter)
app.use("/recipes", recipeRouter)


db()

const PORT = 3000

app.listen(PORT, () => {
    console.log("server running on port ", PORT);
})