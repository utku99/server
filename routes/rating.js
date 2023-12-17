import express from "express";
import { companyDetailModel } from "../model/companyDetail.js";

const router = express.Router();

router.post("/rate", async (req, res) => {
    try {
        const { companyId, userId, rating } = req.body;


        const company = await companyDetailModel.findOne({ companyId });

        if (!company) {
            return res.status(404).json({ msg: "Cafe Bulunamadı" });
        }

        const existingRatingIndex = company.rank.findIndex(
            (userRating) => userRating.userId.toString() === userId
        );

        if (existingRatingIndex !== -1) {
            return res.status(400).json({ msg: "Kullanıcı zaten puanladı" });
        }

        const userRating = { rating, userId }

        company.rank.push(userRating);

        await company.save();

        res.status(201).json({ msg: "Rating added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});


export { router as companyRankRouter };
