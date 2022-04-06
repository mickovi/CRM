const { ApolloServer, gql } = require('apollo-server')

// Base de datos
const cursos = [
    {
        titulo: 'JavaScript Moderno Guía Definitiva Construye +10 Proyectos',
        tecnologia: 'JavaScript ES6',
    },
    {
        titulo: 'React – La Guía Completa: Hooks Context Redux MERN +15 Apps',
        tecnologia: 'React',
    },
    {
        titulo: 'Node.js – Bootcamp Desarrollo Web inc. MVC y REST API’s',
        tecnologia: 'Node.js'
    }, 
    {
        titulo: 'ReactJS Avanzado – FullStack React GraphQL y Apollo',
        tecnologia: 'React'
    }
];

// Schema
const typeDefs = gql `

    type Curso {
        titulo: String        
    }

    type Tecnologia {
        tecnologia: String
    }

    type Query {
        obtenerCursos: [Curso]
    }

    type Query {
        obtenerTecnologias: [Tecnologia]
    }
`

// Resolver
const resolvers = {
    Query: {
        obtenerCursos: () => cursos,
        obtenerTecnologias: () => cursos,
    }
}

// Crear una instancia de ApolloServer
const server = new ApolloServer({
    typeDefs,
    resolvers
})

// Arrancar el servidor
server.listen().then(({url}) => {
    console.log(`🚀 Servidor ${url} listo!`)
})