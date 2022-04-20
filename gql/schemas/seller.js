const { gql } = require('apollo-server');

typeDef = gql`
    extend type Query {
        getSeller(token: String!): Seller
        getTopSeller: [TopSeller]
    }

    extend type Mutation {
        newSeller(input: SellerInput): Seller
        authSeller(input: AuthInput): Token
    }

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

    type TopSeller {
        total: Float
        seller: [Seller]
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
`;

module.exports = typeDef;