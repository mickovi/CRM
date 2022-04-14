const sellerController = require('../controller/sellerController');
const productsController = require('../controller/productsController');
const clientController = require('../controller/clientController');

const resolvers = {
    Query: {
        getSeller: (_, { token }) => sellerController.getSeller(token),

        getProducts: () => productsController.getProducts(),
        getProduct: (_, { id }) => productsController.getProduct(id),

        getClients: () => clientController.getClients(),
        getSellersClient: (_, {}, ctx) => clientController.getSellersClient(ctx),
        getClient: (_, { id }, ctx) => clientController.getClient(id, ctx),
    },
    Mutation: {
        newSeller: (_, { input } ) => sellerController.newSeller(input),
        authSeller: (_, { input }) => sellerController.authSeller(input),

        newProduct: (_, { input } ) => productsController.newProduct(input),
        updateProduct: (_, { id, input } ) => productsController.updateProduct(id, input),
        deleteProduct: (_, { id } ) => productsController.deleteProduct(id),

        newClient: (_, { input }, ctx ) => clientController.newClient(input, ctx),
        updateClient: (_, { id, input }, ctx ) => clientController.updateClient(id, input, ctx),
        deleteClient: (_, { id }, ctx) => clientController.deleteClient(id, ctx),
    }
};

module.exports = resolvers;