const orderController = require('../../controller/orderController');

const resolvers = {
    Query: {
        getOrders: () => orderController.getOrders(),
        getOrdersSeller: (_, {}, ctx) => orderController.getOrdersSeller(ctx),
        getOrder: (_, { id }, ctx) => orderController.getOrder(id, ctx),
        getOrderByState: (_, { state }, ctx) => orderController.getOrderByState(state, ctx)
    },
    Mutation: {
        newOrder: (_, { input }, ctx ) => orderController.newOrder(input, ctx),
        updateOrder: (_, { id, input }, ctx ) => orderController.updateOrder(id, input, ctx),
        deleteOrder: (_, { id }, ctx ) => orderController.deleteOrder(id, ctx)
    }
};
module.exports = resolvers;