import express, { Request, Response } from "express";

import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import myUserRoute from "./routes/myUserRoute"

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL as string).then(() => {
    console.log("connected to DB");
});

app.use("/api/my/users", myUserRoute)

app.get("/test", async (req: Request, res:Response) => {
    res.json({message: "hello!"});
});

app.listen(7000, () => {
    console.log("Server listening on port:7000")
})