'use strict';

var ipconfig = require('ip');

const repository = require('../repositories/fluxo-repository');

exports.put = async(req, res, next) => {
    try {
        let agent = req.headers['user-agent'];
        let ip = ipconfig.address(); 

        await repository.put(req.params.sgc_id_fluxo, {
            SGC_ID_STATUS: req.body.SGC_ID_STATUS,
            SGC_MATRICULA: req.body.SGC_MATRICULA,          
            HOSTNAME: agent,
            IP: ip
        });
        res.status(200).send([{
            MSN: 'Requisição efetuada com sucesso'
        }]);
    } catch (e) {
        res.status(500).send([{
            message: 'Falha ao processar requisição'
        }]);
    }
};