const { gql } = require('apollo-server');

typeDefs = gql`
    type Seller {
        id: ID
        firstName: String
        lastName: String
        email: String
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

    type Query {
        getSeller(token: String!): Seller
    }

    type Mutation {
        newSeller(input: SellerInput): Seller
        authSeller(input: AuthInput): Token
    }
`;

module.exports = typeDefs;