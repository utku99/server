import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    savedRecipes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "recipe"
    }]
})

export const authModel = mongoose.model("auth",authSchema)

