'use strict';

const repository = require('../repositories/contrato-repository');

exports.get = async(req, res, next) => {
    try {       
        var data = await repository.get({
            sgc_matricula: req.params.sgc_matricula, 
            sgc_id_perfil: req.params.sgc_id_perfil
           }); 
        res.status(200).send(data);
    } catch (e) {
        console.log(e.message);
        res.status(500).send([{
            MSN: 'Falha ao processar requisição'
        }]);
    }
}