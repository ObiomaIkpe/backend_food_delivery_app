import express, { Request, Response } from "express";

import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import myUserRoute from "./routes/myUserRoute";
import myRestaurantRoute from "./routes/myRestaurantRoutes";

import {v2 as cloudinary} from "cloudinary";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL as string).then(() => {
    console.log("connected to DB");
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use("/api/my/users", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);

app.get("/test", async (req: Request, res:Response) => {
    res.json({message: "hello!"});
});

app.listen(7000, () => {
    console.log("Server listening on port:7000")
})