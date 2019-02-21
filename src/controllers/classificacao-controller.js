'use strict';

const repository = require('../repositories/classificacao-repository');

exports.get = async(req, res, next) => {
    try {       
        var data = await repository.get(); 
        res.status(200).send(data);
    } catch (e) {
        console.log(e.message);
        res.status(500).send([{
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
            MSN: 'Requisição efetuada com sucesso'
        }]);
    } catch (e) {
        res.status(500).send([{
            MSN: 'Falha ao processar requisição'
        }]);
    }
};

exports.put = async(req, res, next) => {
    try {
        await repository.put(req.params.sgc_id, req.body);
        res.status(200).send([{
            MSN: 'Requisição efetuada com sucesso'
        }]);
    } catch (e) {
        res.status(500).send([{
            message: 'Falha ao processar requisição'
        }]);
    }
};

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.params.sgc_id)
        res.status(200).send([{
            MSN: 'Requisição efetuada com sucesso'
        }]);
    } catch (e) {
        res.status(500).send([{
            message: 'Falha ao processar requisição'
        }]);
    }
};