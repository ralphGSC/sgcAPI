'use strict';

const db = require('../services/database-service');


exports.get = async (cod_usuario) => { 
    const res = await db.comandText(`SELECT * FROM SGC_USUARIO_PERFIL
                                      WHERE 1=1
                                        AND COD_USUARIO = ${cod_usuario}`);
    return res.rows;
}