const Product = require('../models/Product');


const newProduct = async input => {

    // 3. Guardar el registro del vendedor en la base de datos.
    try {
        const product = new Product(input);
        const request = await product.save();
        return request;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    newProduct,
};