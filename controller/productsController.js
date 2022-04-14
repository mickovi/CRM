const Product = require('../models/Product');

// QUERY

const getProduct = async id => {
    try {
        const product = await Product.findById(id);
        if (!product) throw new Error('Producto no encontrado');
        return product;
    } catch (error) {
        console.log(error);
    };
};

const getProducts = async () => {
    try {
        const products = await Product.find({});
        return products;
    } catch (error) {
        console.log(error);
    };
};

// MUTATION

const newProduct = async input => {

    // Guardar el registro del vendedor en la base de datos.
    try {
        const product = new Product(input);
        const request = await product.save();
        return request;
    } catch (error) {
        console.log(error);
    }
};

const updateProduct = async (id, input) => {
    let product = await Product.findById(id);

    // 1. Validar la existencia del producto
    if (!product) throw new Error('Producto no encontrado');
    
    // 2. Actualizar y guardar en la base de datos
    product = await Product.findOneAndUpdate({_id: id}, input, {new: true});

    return product;
};

const deleteProduct = async id => {
    let product = await Product.findById(id);

    // 1. Validar la existencia del producto
    if (!product) throw new Error('Producto no encontrado');

    // 2. Eliminar
    await Product.findOneAndDelete({_id: id});

    return 'Producto eliminado!'
}

module.exports = {
    getProduct,
    getProducts,
    newProduct,
    updateProduct,
    deleteProduct,
};