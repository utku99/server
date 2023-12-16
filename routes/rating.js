import express from "express";
import mongoose from "mongoose";

import { companyDetailModel } from "../model/companyDetail.js";
import { userRatingModel } from "../model/userRating.js";

const router = express.Router();

router.post('/rate', async (req, res) => {
    try {
        const { companyId, userId, rating } = req.body;

        if (!mongoose.Types.ObjectId.isValid(companyId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, error: 'Invalid companyId or userId' });
        }

        const companyIdObject = new mongoose.Types.ObjectId(companyId);
        const userIdObject = new mongoose.Types.ObjectId(userId);

        const company = await companyDetailModel.findById({ companyIdObject });

        if (!company) {
            return res.status(404).json({ success: false, error: 'Company not found' });
        }

        const existingRating = await userRatingModel.findOne({ companyId: companyIdObject, userId: userIdObject });

        if (existingRating) {
            existingRating.rating = rating;
            await existingRating.save();
        } else {
            const userRating = new userRatingModel({ companyId: companyIdObject, userId: userIdObject, rating });
            await userRating.save();
            company.rank.push(userRating);
            await company.save();
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

export { router as companyRankRouter };
