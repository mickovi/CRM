const mongoose = require('mongoose');

// 1. Definir el Schema
const SellerSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        trim: true
    },
    lastName: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    password: {
        type:  String,
        require: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

// 2. Definir el modelo
module.exports = mongoose.model('Seller', SellerSchema);