const {default: mongoose} = require("mongoose");

const restaurantModel = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    restaurantName: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
});


export const restaurantSchema = mongoose.models.restaurants || mongoose.model('restaurants', restaurantModel);