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

    type Query {
        getSeller(token: String!): Seller
    }

    type Mutation {

        # Sellers
        newSeller(input: SellerInput): Seller
        authSeller(input: AuthInput): Token

        # Products
        newProduct(input: ProductInput): Product
    }
`;

module.exports = typeDefs;  