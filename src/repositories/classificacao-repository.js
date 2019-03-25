'use strict';

const db = require('../services/database-service');


exports.get = async (data) => { 
    const res = await db.comandText(`SELECT * FROM SGC_CLASSIFICACAO`);     
    return res.rows;
}

// exports.post = async (data) => {  
//     const res = await db.comandText(`INSERT INTO SGC_CLASSIFICACAO 
//                                     (SGC_ID, SGC_DESC_CLASSIFICACAO)
//                                     VALUES
//                                     (${data.SGC_ID}, '${data.SGC_DESC_CLASSIFICACAO}')`);   
   
//     return res;
// }

// exports.put = async (sgc_id, data) => {      
//     const res = await db.comandText(`UPDATE SGC_CLASSIFICACAO SET
//                                             SGC_DESC_CLASSIFICACAO = '${data.SGC_DESC_CLASSIFICACAO}' 
//                                      WHERE 1=1
//                                        AND SGC_ID = ${sgc_id}`);   
   
//     return res;
// }

// exports.delete = async (sgc_id) => { 
//     console.log(sgc_id);
//     const res = await db.comandText(`DELETE FROM SGC_CLASSIFICACAO
//                                       WHERE 1=1
//                                         AND SGC_ID = ${sgc_id}`);   
   
//     return res;
// }