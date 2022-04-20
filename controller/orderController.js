const Order = require('../models/Order');
const Client = require('../models/Client');
const Product = require('../models/Product');

// QUERY
const getOrders = async () => {
    try {
        const orders = await Order.find({});
        return orders;
    } catch (error) {
        console.log(error);
    }
};

const getOrdersSeller = async (ctx) => {
    try {
        const orders = await Order.find({seller: ctx.seller.id});
        return orders;
    } catch (error) {
        console.log(error);
    }
};

const getOrder = async (id, ctx) => {
    const order = await Order.findById(id);
    
    // 1. Verificar si el pedido existe
    if (!order) throw new Error('Pedido no encontrado.');

    // TODO: Lo ideal sería que en el sistema no tengas la opción de buscar el pedido de otro cliente
    // 2. Verificar si el cliente es parte del vendedor
    if (order.seller.toString() !== ctx.seller.id) throw new Error('No tienes las credenciales para acceder a este pedido.');

    // 3. Retornar el pedido
    return order;
};

const getOrderByState = async (state, ctx) => {
    const orders = await Order.find({seller: ctx.seller.id, state});

    // 1. Verificar si el pedido existe
    if (orders.length == 0) throw new Error('No hay resultados');
    // console.log(orders, orders.seller)
    
    // 2. Retornar los pedidos
    return orders;
};

// MUTATION

const newOrder = async (input, ctx) => {

    const { client } = input;
    const existClient = await Client.findById(client);

    // 1. Verificar si el cliente existe
    if (!existClient) throw new Error('Cliente no encontrado.');

    // 2. Verificar si el cliente es parte del vendedor
    if (existClient.seller.toString() !== ctx.seller.id) throw new Error('No tienes las credenciales para acceder a este cliente.');

    // 3. Revisar la cantidad del pedido no supere al stock
    for await (const item of input.order) {
        const { id } = item;
        const product = await Product.findById(id);

        if (item.quantity > product.stock) {
            throw new Error(`El producto ${product.name} excede la cantidad disponible`);
        }
        else {
            // Quitamos la cantidad del pedido de un producto del stock
            product.stock -= item.quantity;

            // Actualizamos el stock de productos en la base de datos
            await product.save();
        }
        // console.log('Si pasa la validación muestra esto, si no se queda en espera');
    };

    // 4. Crear un nuevo pedido
    const newOrder = new Order(input);

    // 5. Asignarle un vendedor 
    newOrder.seller = ctx.seller.id;

    // 6. Guardar la info en la base de datos
    const response = await newOrder.save();
    return response;
};

const updateOrder = async (id, input, ctx) => {
    const existOrder =  await Order.findById(id);
    const { client } = input;
    const existClient = await Client.findById(client);
    // console.log(existOrder, Order);

     // 1. Verificar si el pedido existe
     if (!existOrder) throw new Error('Pedido no encontrado.');

     // 2. Verificar si el cliente existe
    if (!existClient) throw new Error('Cliente no encontrado.');

    // 3. Verificar si el cliente es parte del vendedor
    if (existClient.seller.toString() !== ctx.seller.id) throw new Error('No tienes las credenciales para acceder a este pedido.');

    // 4. Revisar la cantidad del pedido no supere al stock (si se ingresa un pedido en en input (playground))
    if (input.order) {
        for await (const item of input.order) {
            const { id } = item;
            const product = await Product.findById(id);
    
            if (item.quantity > product.stock) {
                throw new Error(`El producto ${product.name} excede la cantidad disponible`);
            }
            else {
                // Recuperamos la cantidad inicial del pedido
                const initialQuantityOrder = existOrder.order.find(item => item.id == id).quantity;
                // Quitamos la cantidad del pedido de un producto del stock
                product.stock = product.stock + ( initialQuantityOrder - item.quantity );
    
                // Actualizamos el stock de productos en la base de datos
                await product.save();
            }
            // console.log('Si pasa la validación muestra esto, si no se queda en espera');
        };
    };

    // 5. Actualizar y guardar en la base de datos
    const orderUpdated = await Order.findOneAndUpdate({_id: id}, input, {new: true});

    return orderUpdated;
};

// TODO: La cantidad regresa al stock?
const deleteOrder = async (id, ctx) => {
    const existOrder = await Order.findById(id);

    // 1. Verificar si el pedido existe
    if (!existOrder) throw new Error('Pedido no encontrado.');

    // 2. Verificar si el vendedor tiene acceso
    if (existOrder.seller.toString() !== ctx.seller.id) throw new Error('No tienes las credenciales para eliminar este pedido.');

    // 3. Eliminar de la base de datos
    await Order.findOneAndDelete({_id: id});

    return 'Pedido eliminado';
};

module.exports = {
    getOrders,
    getOrdersSeller,
    getOrder,
    newOrder,
    updateOrder,
    deleteOrder,
    getOrderByState
};