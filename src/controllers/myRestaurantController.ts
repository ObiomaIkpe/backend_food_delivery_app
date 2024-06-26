import { Request, Response } from "express";
import Restaurant from "../models/restaurantModel";
import cloudinary from "cloudinary"
import mongoose from "mongoose";


const createMyRestaurant = async (req: Request, res: Response) => {
    try {
        const existingRestaurant = await Restaurant.find({user: req.userId});

        if(existingRestaurant){
            return res.status(409).json({message: "User restaurant already exists"})
        }

        const image = req.file as Express.Multer.File;
        const base64img = Buffer.from(image.buffer).toString("base64");
        const dataURI = `data:${image.mimetype};base64,${base64img}`;

        const uploadResponse = await cloudinary.v2.uploader.upload(dataURI)

        const restaurant = new Restaurant(req.body);
        restaurant.imageUrl = uploadResponse.url;
        restaurant.user = new mongoose.Types.ObjectId(req.userId);

        await restaurant.save();
        restaurant.lastUpdated = new Date();
        res.status(201).send(restaurant);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "something went wrong!"})
    }
};

export default {
    createMyRestaurant
}