const {default: mongoose} = require("mongoose");

const restaurantModel = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    restaurantName: String,
    address: String,
    contact: String,
});


export const restaurantSchema = mongoose.models.restaurants || mongoose.model('restaurants', restaurantModel);