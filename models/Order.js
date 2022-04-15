const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    order: {
        type: Array,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    client: {
        type: mongoose.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    seller: {
        type: mongoose.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    state: {
        type: String,
        default: 'PENDIENT'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports =  mongoose.model('Order', OrderSchema);