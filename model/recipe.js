import mongoose, { mongo } from "mongoose";


const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ingredients: [{
        type: String,
        required: true
    }],
    instructions: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    cookingTime: {
        type: Number,
        required: true
    },
    userOwner: { //tarifi giren kişinin kayıtları
        type: mongoose.Schema.Types.ObjectId, //mongo db nin id için atadığı type yani aslında user id
        ref: "auth", //referansı auth tablosudur
        required: true
    }
})

export const recipModel = mongoose.model("recipe", recipeSchema)

