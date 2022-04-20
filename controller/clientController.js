const { orderBy } = require('lodash');
const Client = require('../models/Client');
const Order = require('../models/Order');

// QUERY

const getClients = async () => {
    try {
        const clients = Client.find({});
        return clients;
    } catch (error) {
        console.log(error);
    }
};

const getSellersClient = async ctx => {
    try {
        const clients = await Client.find({ seller: ctx.seller.id.toString() });
        return clients;
    } catch (error) {
        console.log(error);
    }
};

const getClient = async (id, ctx) => {
    const client = await Client.findById(id);
    // 1. Verificar si el cliente existe
    if (!client) throw new Error('Cliente no encontrado.');

    // 2. El vendedor puede acceder a sus clientes
    if (client.seller.toString() !== ctx.seller.id) throw new Error('No tienes las credenciales para acceder a este cliente.');
    return client;
};

const getTopClients = async () => {
    const clients = await Order.aggregate([
        {
            $match: {
                state: 'COMPLETED'
            }
        },
        {
            $group: {
                _id: '$client',
                total: { $sum: '$total' }
            } 
        },
        {
            $lookup: {
                from: 'clients',
                localField: '_id',
                foreignField: '_id',
                as: 'client'
            }
        },
        {
            $sort: {
                total: -1
            }
        }
    ]);
    return clients;
};

// MUTATION

const newClient = async (input, ctx) => {
    console.log(ctx);
    const { email } = input;
    const client = await Client.findOne({ email });

    // 1. Verificar si el cliente ya está registrado
    if (client) throw new Error(`El cliente ${client} ya está registrado.`);
    const newClient = new Client(input);
    
    // 2. Asignar el vendedor
    newClient.seller = ctx.seller.id;

    // 3. Guardarlo en la base de datos
    try {
        const response = await newClient.save();
        return response;
    } catch (error) {
        console.log(error);
    };
};

const updateClient = async (id, input, ctx) => {
    let client = await Client.findById(id);
    // 1. Verificar si existe el cliente
    if (!client) throw new Error('Cliente no encontrado.');

    // 2. Verificar si el vendedor tiene acceso (puede editar la información del cliente)
    if (client.seller.toString() !== ctx.seller.id) throw new Error('No tienes las credenciales para acceder a este cliente.');

    // 3. Guardar la actualización en la base de datos
    try {
        client = await Client.findOneAndUpdate({_id: id}, input, {new: true});
        return client;
    } catch (error) {
        console.log(error);
    }

};

const deleteClient = async (id, ctx) => {
    let client = await Client.findById(id);
    // 1. Verificar si existe el cliente
    if (!client) throw new Error('Cliente no encontrado.');

    // 2. Verificar si el vendedor tiene acceso (puede editar la información del cliente)
    if (client.seller.toString() !== ctx.seller.id) throw new Error('No tienes las credenciales para acceder a este cliente.');

    // 3. Eliminar el cliente de la base de datos
    try {
        client = await Client.findOneAndDelete({_id: id});
        return 'Cliente eliminado!';
    } catch (error) {
        console.log(error);
    }
};

// TODO: Refactorizar, hay mucha repeticion
module.exports = {
    getClients,
    getSellersClient,
    getClient,
    getTopClients,
    newClient,
    updateClient,
    deleteClient
}