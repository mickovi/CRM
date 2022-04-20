const { ApolloServer } = require('apollo-server');
const connectDB = require('./config/db');

// Para autenticar el cliente de un vendedor:
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variable.env'} );

// Modularizar los schemas y resolvers
const _ = require("lodash");

const {
    baseTypeDef,
    clientTypeDef,
    sellerTypeDef,
    productTypeDef,
    orderTypeDef
} = require('./gql/schemas');

const {
    clientResolver,
    sellerResolver,
    productResolver,
    orderResolver
} = require('./gql/resolvers');


// Conectar a la base de datos
connectDB();

// Crear una instancia de ApolloServer
const server = new ApolloServer({
    typeDefs: [
        baseTypeDef,
        clientTypeDef,
        sellerTypeDef,
        productTypeDef,
        orderTypeDef
    ],
    resolvers: _.merge(
        {},
        clientResolver,
        sellerResolver,
        productResolver,
        orderResolver
    ),
    context: ({ req }) => {
        // console.log(req.headers['authorization']);
        const token = req.headers['authorization'] || '';
        if (token) {
            try {
                const seller = jwt.verify(token, process.env.AUTH_KEY);
                // console.log(seller);
                return {
                    seller
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
});

// Arrancar el servidor
server.listen().then(({url}) => {
    console.log(`🚀 Servidor ${url} listo!`);
});