// Seller tiene todos los métodos de mongoose para insertar los registro a la BD.
const Seller = require('../models/Seller');
const Order = require('../models/Order');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verify } = require('jsonwebtoken');
require('dotenv').config({ path: 'variable.env'} );

// Helpers

const createToken = (seller, key, expiresIn) => {
    // console.log(seller);
    const { id, firstName, lastName, email } = seller;
    const payload = {
        id, 
        firstName, 
        lastName, 
        email
    };
    // Firmar el token
    return jwt.sign(payload, key, { expiresIn });
};

// QUERY

const getSeller = async token => {
    // Verificar el token
    const sellerID = await verify(token, process.env.AUTH_KEY);
    return sellerID;
};

const getTopSeller = async () => {
    const sellers = await Order.aggregate([
        {
            $match: {
                state: 'COMPLETED'
            }
        },
        {
            $group: {
                _id: '$seller',
                total: {
                    $sum: '$total'
                }
            }
        },
        {
            $lookup: {
                from: 'sellers',
                localField: '_id',
                foreignField: '_id',
                as: 'seller'
            }
        },
        {
            $limit: 5
        },
        {
            $sort: {
                total: -1
            }
        }
    ]);
    return sellers;
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

    // 3. Guardar el registro del vendedor en la base de datos.
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
    if (!existSeller) throw new Error('El vendedor o contraseña es incorrecta o no existe.'); // El vendedor no existe.

    // 2. Verificar si el password es correcto
    const passwordSuccess = await bcryptjs.compare(password, existSeller.password);
    if (!passwordSuccess) throw new Error('El vendedor o contraseña es incorrecta o no existe.'); // La contraseña es incorrecta.
    
    // 3. Crear el token
    return {
        token: createToken(existSeller, process.env.AUTH_KEY, '24h')
    };
};

module.exports = {
    getSeller,
    getTopSeller,
    newSeller,
    authSeller,
}