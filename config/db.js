const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB, {
            /* 
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
             */
        });
        console.log('Conexión a la base de datos establecida.')
    } catch (error) {
        console.log(error)
        process.exit(1); // Detener la aplicación
    }
}

module.exports = connectDB;