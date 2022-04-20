const { gql } = require('apollo-server');

typeDef = gql`
    extend type Query {
        getProducts: [Product]
        getProduct(id: ID!): Product
        searchProduct(text: String!): [Product]
    }

    extend type Mutation {
        newProduct(input: ProductInput): Product
        updateProduct(id: ID!, input: ProductUpdateInput): Product
        deleteProduct(id: ID!): String
        # TODO: disabledProduct
    }

    type Product {
        id: ID
        name: String
        stock: Int
        price: Float
        createdAt: String
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
`;

module.exports = typeDef;