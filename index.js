const { ApolloServer } = require('apollo-server');
const typeDefs = require('./gql/schema');
const resolvers = require('./gql/resolvers');
const connectDB = require('./config/db');
// Para autenticar el cliente de un vendedor:
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variable.env'} );

// Conectar a la base de datos
connectDB();

// Crear una instancia de ApolloServer
const server = new ApolloServer({
    typeDefs,
    resolvers,
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