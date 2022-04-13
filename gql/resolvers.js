const sellerController = require('../controller/sellerController');
const productsController = require('../controller/productsController');

const resolvers = {
    Query: {
        getSeller: (_, { token }) => sellerController.getSeller(token),
    },
    Mutation: {
        newSeller: (_, { input } ) => sellerController.newSeller(input),
        authSeller: (_, { input }) => sellerController.authSeller(input),

        newProduct: (_, { input } ) => productsController.newProduct(input),
    }
};

module.exports = resolvers;