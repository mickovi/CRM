const { gql } = require('apollo-server');

typeDef = gql`
    extend type Query {
        getClients: [Client]
        getSellersClient: [Client]
        getClient(id: ID!): Client
        getTopClients: [TopClient]
    }

    extend type Mutation {
        newClient(input: ClientInput): Client
        updateClient(id: ID!, input: ClientUpdateInput): Client
        deleteClient(id: ID!): String
    }

    type Client {
        id: ID
        firstName: String
        lastName: String
        email: String
        phone: String
        enterprise: String
        seller: ID
    }

    type TopClient {
        total: Float
        client: [Client]
    }

    input ClientInput {
        firstName: String!
        lastName: String!
        email: String!
        phone: String
        enterprise: String!
    }

    input ClientUpdateInput {
        firstName: String
        lastName: String
        email: String
        phone: String
        enterprise: String
    }
`;

module.exports = typeDef;