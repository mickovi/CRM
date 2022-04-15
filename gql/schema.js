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

    # OBS: El vendedor (seller) se asigna por medio de la autenticación

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

    type Query {

        # Seller
        getSeller(token: String!): Seller

        # Product
        getProducts: [Product]
        getProduct(id: ID!): Product

        # Client
        getClients: [Client]
        getSellersClient: [Client]
        getClient(id: ID!): Client

        # Order
        getOrders: [Order]
        getOrdersSeller: [Order]
        getOrder(id: ID!): Order    
        getOrderByState(state: String!): [Order]
    }

    type Mutation {

        # Seller
        newSeller(input: SellerInput): Seller
        authSeller(input: AuthInput): Token

        # Product
        newProduct(input: ProductInput): Product
        updateProduct(id: ID!, input: ProductUpdateInput): Product
        deleteProduct(id: ID!): String
        # TODO: disabledProduct

        # Client
        newClient(input: ClientInput): Client
        updateClient(id: ID!, input: ClientUpdateInput): Client
        deleteClient(id: ID!): String

        # Order
        newOrder(input: OrderInput): Order
        updateOrder(id: ID!, input: OrderInput): Order
        deleteOrder(id: ID!): String
    }
`;

module.exports = typeDefs;  