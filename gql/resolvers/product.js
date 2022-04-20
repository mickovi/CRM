const productsController = require('../../controller/productsController');

const resolvers = {
    Query: {
        getProducts: () => productsController.getProducts(),
        getProduct: (_, { id }) => productsController.getProduct(id),
        searchProduct: (_, { text }) => productsController.searchProduct(text)
    },
    Mutation: {
        newProduct: (_, { input } ) => productsController.newProduct(input),
        updateProduct: (_, { id, input } ) => productsController.updateProduct(id, input),
        deleteProduct: (_, { id } ) => productsController.deleteProduct(id)
    }
};
module.exports = resolvers;