'use strict';

const repository = require('../repositories/classificacao-repository');

exports.get = async(req, res, next) => {
    try {       
        var data = await repository.get(); 
        res.status(200).send(data);
    } catch (e) {      
        res.status(500).send([{
            COD: 500,
            MSN: 'Falha ao processar requisição'
        }]);
    }
}

exports.post = async(req, res, next) => {  
    try {
        await repository.post({
            SGC_ID: req.body.SGC_ID,
            SGC_DESC_CLASSIFICACAO: req.body.SGC_DESC_CLASSIFICACAO
        });   

        res.status(201).send([{
            COD: 201,
            MSN: 'Requisição efetuada com sucesso'
        }]);
    } catch (e) {
        res.status(500).send([{
            COD: 500,
            MSN: 'Falha ao processar requisição'
        }]);
    }
};

exports.put = async(req, res, next) => {
    try {
        await repository.put(req.params.sgc_id, req.body);
        res.status(200).send([{
            COD: 200,
            MSN: 'Requisição efetuada com sucesso'
        }]);
    } catch (e) {
        res.status(500).send([{
            COD: 500,
            MSN: 'Falha ao processar requisição'
        }]);
    }
};

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.params.sgc_id)
        res.status(200).send([{
            COD: 200,
            MSN: 'Requisição efetuada com sucesso'
        }]);
    } catch (e) {
        res.status(500).send([{
            COD: 500,
            MSN: 'Falha ao processar requisição'
        }]);
    }
};