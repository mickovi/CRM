const { gql } = require('apollo-server');

typeDef = gql`
    extend type Query {
        getOrders: [Order]
        getOrdersSeller: [Order]
        getOrder(id: ID!): Order    
        getOrderByState(state: String!): [Order]
    }

    extend type Mutation {
        newOrder(input: OrderInput): Order
        updateOrder(id: ID!, input: OrderInput): Order
        deleteOrder(id: ID!): String
    }

    type Order {
        id: ID
        order: [InfoOrder]
        total: Float
        client: ID
        seller: ID
        date: String
        state: OrderState
    }

    type InfoOrder {
        id: ID
        quantity: Int
    }

    input OrderProductInput {
        id: ID
        quantity: Int
    }

    input OrderInput {
        order: [OrderProductInput]
        total: Float!
        client: ID!
        state: OrderState 
    }

    enum OrderState {
        PENDING
        COMPLETED
        CANCELED
    }
`;

module.exports = typeDef;