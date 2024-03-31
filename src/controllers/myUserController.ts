import { Request, Response } from "express";
import User from "../models/userModel";

const createCurrentUser =async (req: Request, res: Response) => {
    
    try {
        // 1) check if the user exists.
        const {auth0Id} = req.body;
        const existingUser = await User.findOne({ auth0Id});
        
        
        // 2) create the user if none exists
        if(existingUser) {
            res.status(200).send();
        }
        
        
        // 3) return the user object to the calling client
        const newUser = new User(req.body);
        await newUser.save();

        res.status(201).json(newUser.toObject());
    } catch (error) {
       console.log(error); 
       res.status(500).json({message: "error creating user!"})
    }
}

const updateCurrentUser = async (req: Request, res: Response) => {
    try {
        const {name, addressLine1, country, city} = req.body;
        const user = await User.findById(req.userId);

        if(!user) {
            return res.status(404).json({message: "user not found!"})
        }

        user.name = name;
        user.addressLine1 = addressLine1;
        user.city = city;
        user.country = country;

        await user.save();

        res.status(200).send(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "error updating user!"})
    }
}

export default {
    createCurrentUser,
    updateCurrentUser
};