const clientController = require('../../controller/clientController');

const resolvers = {
    Query: {
        getClients: () => clientController.getClients(),
        getSellersClient: (_, {}, ctx) => clientController.getSellersClient(ctx),
        getClient: (_, { id }, ctx) => clientController.getClient(id, ctx),
        getTopClients: () => clientController.getTopClients()
    },
    Mutation: {
        newClient: (_, { input }, ctx ) => clientController.newClient(input, ctx),
        updateClient: (_, { id, input }, ctx ) => clientController.updateClient(id, input, ctx),
        deleteClient: (_, { id }, ctx) => clientController.deleteClient(id, ctx)
    }
};
module.exports = resolvers;