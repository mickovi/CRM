const { gql } = require('apollo-server');

typeDefs = gql`
    type Seller {
        id: ID
        firstName: String
        lastName: String
        email: String
        createdAt: String
    }

    type Product {
        id: ID
        name: String
        stock: Int
        price: Float
        createdAt: String
    }

    type Token {
        token: String
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

    input SellerInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
    }

    input AuthInput {
        email: String!
        password: String!
    }

    input ProductInput {
        name: String!
        stock: Int!
        price: Float!
    }

    input ProductUpdateInput {
        name: String
        stock: Int
        price: Float
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

    type Query {

        # Sellers
        getSeller(token: String!): Seller

        # Products
        getProducts: [Product]
        getProduct(id: ID!): Product

        # Clients
        getClients: [Client]
        getSellersClient: [Client]
        getClient(id: ID!): Client
    }

    type Mutation {

        # Sellers
        newSeller(input: SellerInput): Seller
        authSeller(input: AuthInput): Token

        # Products
        newProduct(input: ProductInput): Product
        updateProduct(id: ID!, input: ProductUpdateInput): Product
        deleteProduct(id: ID!): String
        # TODO: disabledProduct

        # Clients
        newClient(input: ClientInput): Client
        updateClient(id: ID!, input: ClientUpdateInput): Client
        deleteClient(id: ID!): String
    }
`;

module.exports = typeDefs;  