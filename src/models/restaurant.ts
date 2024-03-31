import mongoose from "mongoose";

const menuItemsSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
});

const restaurantSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },
    restaurantName: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true,
    },
    deliveryPrice: {
        type: String,
        required: true,       
    },
    estimatedDeliveryTime: {        
            type: String,
            required: true        
    },
    cuisines: {
        type: String,
            required: true 
    },
    menuItems: [menuItemsSchema],
    imageUrl: {
        type: String,
        required: true 
    },
    lastUpdated: {
        type: Date,
        required: true
    }
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;