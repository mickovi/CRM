const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SellerSchema = Schema({
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

module.exports = mongoose.model('Seller', SellerSchema);