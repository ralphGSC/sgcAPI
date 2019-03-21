'use strict';

const db = require('../services/database-service');

exports.put = async (sgc_id_fluxo, data) => {      
    const res = await db.comandText(`UPDATE SGC_FLUXO SET
                                            SGC_ID_STATUS = ${data.SGC_ID_STATUS}, 
                                            SGC_MATRICULA = ${data.SGC_MATRICULA},
                                            SGC_DATA = SYSDATE,
                                            HOSTNAME = '${data.HOSTNAME}',
                                            IP = '${data.IP}'
                                     WHERE 1=1
                                     AND SGC_ID_FLUXO = ${sgc_id_fluxo}`);   
    return res;
}