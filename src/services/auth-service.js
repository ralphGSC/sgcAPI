'use strict';
const jwt = require('jsonwebtoken');

exports.encodeToken = async (data) => {   
    return jwt.sign(data, global.KEY, { expiresIn: '1d' });
}

exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, global.KEY);    
    return data;
}

exports.authorize = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json([{
            MSN: 'Acesso Restrito'
        }]);
    } else {
        jwt.verify(token, global.KEY, function (error) {
            if (error) {
                res.status(401).json([{
                    MSN: 'Token Inválido'
                }]);
            } else {
                next();
            }
        });
    }
};