'use strict';

const repository = require('../repositories/perfil-repository');

exports.get = async(req, res, next) => {
    try {       
        var data = await repository.get(req.params.cod_usuario); 
        res.status(200).send(data);
    } catch (e) {  
        res.status(500).send([{
            COD: 500,
            MSN: 'Falha ao processar requisição'
        }]);
    }
}