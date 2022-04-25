const Product = require('../models/productos.model');
const jwt = require('jsonwebtoken');
const jwtconfig = require('../config/jwt.config');
const nodeMailer = require('../config/nodemailer.config');
const jwtDecode = require('jwt-decode');
const bycrpt = require('bcryptjs');

exports.registerPro = (req, res) => {
    let newProduc = new User({
        id: req.body.id,
        name : req.body.name,
        picture :req.body.picture,
        price : req.body.price,
        category : req.body.category,
        description : req.body.description
    });

    getProduct(newProduc.id, (err, products) => {
        if (!err) {
            if (products == null) {
                createUser(newProduc, (err, products) => {
                    if (err) {
                        res.status(401).json({ success: false, msg: 'Error al registrar el producto', err: err });
                    } else {
                        res.status(200).json({ success: true, msg: 'Producto registrado' });
                    }
                });
            } else {
                res.status(401).json({ success: false, msg: 'El producto ya se encuentra registrado' });
            }
        }
    });
}

function getProduct(id, callback) {
    const query = { id: id }
    User.findOne(query, callback);
}