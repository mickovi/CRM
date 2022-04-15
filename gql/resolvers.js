const sellerController = require('../controller/sellerController');
const productsController = require('../controller/productsController');
const clientController = require('../controller/clientController');
const orderController = require('../controller/orderController');

const resolvers = {
    Query: {
        getSeller: (_, { token }) => sellerController.getSeller(token),

        getProducts: () => productsController.getProducts(),
        getProduct: (_, { id }) => productsController.getProduct(id),

        getClients: () => clientController.getClients(),
        getSellersClient: (_, {}, ctx) => clientController.getSellersClient(ctx),
        getClient: (_, { id }, ctx) => clientController.getClient(id, ctx),

        getOrders: () => orderController.getOrders(),
        getOrdersSeller: (_, {}, ctx) => orderController.getOrdersSeller(ctx),
        getOrder: (_, { id }, ctx) => orderController.getOrder(id, ctx),
        getOrderByState: (_, { state }, ctx) => orderController.getOrderByState(state, ctx)
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

        newOrder: (_, { input }, ctx ) => orderController.newOrder(input, ctx),
        updateOrder: (_, { id, input }, ctx ) => orderController.updateOrder(id, input, ctx),
        deleteOrder: (_, { id }, ctx ) => orderController.deleteOrder(id, ctx)
    }
};

module.exports = resolvers;