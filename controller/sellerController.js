// Seller tiene todos los métodos de mongoose para insertar los registro a la BD.
const Seller = require('../models/Seller');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verify } = require('jsonwebtoken');
require('dotenv').config({ path: 'variable.env'} );

const createToken = (seller, key, expiresIn) => {
    // console.log(seller);
    const { id, firstName, lastName, email } = seller;
    // Firmar el token
    return jwt.sign( { id, firstName, lastName, email }, key, { expiresIn });
};

// QUERY

const getSeller = async token => {
    // Verificar el token
    const sellerID = await verify(token, process.env.AUTH_KEY);
    return sellerID;
};


// MUTATION

const newSeller = async input => {
    // return `Nuevo vendedor ${input.firstName} creado`;

    const { email, password } = input;

    // 1. Revisar si el vendedor ya está registrado.
    const existSeller = await Seller.findOne({ email });
    if (existSeller) throw new Error('El vendedor ya está registrado. Intenta con otro.');

    // 2. Hashear el password.
    const salt = await bcryptjs.genSalt(10); // genSalt vs genSaltSync?
    input.password = await bcryptjs.hash(password, salt);

    // 3. Guardarlo en la base de datos.
    try {
        const seller = new Seller(input);
        seller.save();
        return seller;
    } catch (error) {
        console.log(error);
    }
};

const authSeller = async input => {
    const { email, password } = input;

    // 1. Verificar que el vendedor exista
    const existSeller = await Seller.findOne({ email });
    if (!existSeller) throw new Error('El vendedor no existe.');

    // 2. Verificar si el password es correcto
    const passwordOK = await bcryptjs.compare(password, existSeller.password);
    if (!passwordOK) throw new Error('La contraseña es incorrecta.');

    // 3. Crear el token
    return {
        token: createToken(existSeller, process.env.AUTH_KEY, '24h')
    };
};

module.exports = {
    getSeller,
    newSeller,
    authSeller,
}