const sellerController = require('../../controller/sellerController');

const resolvers = {
    Query: {
        getSeller: (_, { token }) => sellerController.getSeller(token),
        getTopSeller: () => sellerController.getTopSeller()
    },
    Mutation: {
        newSeller: (_, { input } ) => sellerController.newSeller(input),
        authSeller: (_, { input }) => sellerController.authSeller(input)
    }
};
module.exports = resolvers;