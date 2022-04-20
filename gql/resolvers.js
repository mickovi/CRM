const clientResolver = require('./resolvers/client');
const sellerResolver = require('./resolvers/seller');
const productResolver = require('./resolvers/product');
const orderResolver = require('./resolvers/order');

module.exports = {
    clientResolver,
    sellerResolver,
    productResolver,
    orderResolver
};