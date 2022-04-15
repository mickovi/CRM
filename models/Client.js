const mongoose = require('mongoose');
// TODO: RUC/DNI
const ClientSchema = mongoose.Schema({
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
    phone: {
        type: String,
        trim: true
    },
    enterprise: {
        type:  String,
        require: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now() /* TODO: Mejorar la forma de mostras la fecha, fecha: null? */
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Seller'
    }
});

module.exports = mongoose.model('Client', ClientSchema);