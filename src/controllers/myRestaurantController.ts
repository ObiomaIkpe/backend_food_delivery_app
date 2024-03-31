import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary"


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
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "something went wrong!"})
    }
}