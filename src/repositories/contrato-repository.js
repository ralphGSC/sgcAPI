'use strict';

const db = require('../services/database-service');

exports.get = async (data) => {

    /*
    1	Gestor Contratos
    2	Comissão Orçamentária
    3	Responsável Superior
    4	Controladoria
    5	Financeiro
    6	Jurídico
    7	Tecnologia da Informação
    8	Conferente
    9	Auditoria Interna
    10	Analista Solicitante
    11	Gestor Contratos - Provedoria
    12	Suprimentos
    13	Visualizar Contratos
    14	Orçamentista
    */

    let sql = [];
    let hasPerfil = true;
    let res;

    sql.push(`SELECT SCO.SGC_ID,ST.SGC_DESC_TIPO,SC.SGC_DESC_CLASSIFICACAO,C.SGC_DESC_CRITICIDADE,
                     S.NOME_USUARIO,SP.NOME AS NOME_EMPRESA
                FROM SGC_OBJETO_CONTRATO SCO
                INNER JOIN SGC_FLUXO SF ON SF.SGC_ID_CONTRATO = SCO.SGC_ID
                INNER JOIN SGC_CLASSIFICACAO SC ON SC.SGC_ID = SCO.SGC_ID_CLASSIFICACAO
                INNER JOIN SGC_PRESTADORES SP ON SP.CPF_CNPJ = SCO.SGC_CNPJ OR  CAST(SP.ID AS VARCHAR(200)) = SCO.SGC_CNPJ
                INNER JOIN SGC_TIPOS ST ON ST.SGC_ID = SCO.SGC_ID_TIPO
                INNER JOIN SGC_CLASSIFICACAO SC ON SC.SGC_ID = SCO.SGC_ID_CLASSIFICACAO
                INNER JOIN SGC_USUARIOS S ON CAST(S.MATRICULA_USUARIO AS NUMBER) = CAST(SCO.SGC_MATRICULA AS NUMBER)
                LEFT JOIN SGC_CRITICIDADE C ON C.SGC_ID_CRITICIDADE = SCO.SGC_CRITICIDADE
                WHERE SF.SGC_DATA =
                    (SELECT MAX(S.SGC_DATA)
                        FROM SGC_FLUXO S
                        WHERE S.SGC_ID_CONTRATO = SF.SGC_ID_CONTRATO)
                AND SCO.SGC_ID IN (SELECT SRR.SGC_ID_CONTRATO
                                    FROM SGC_RATEIO SRR
                                    GROUP BY SRR.SGC_ID_CONTRATO
                                    HAVING SUM(SRR.SGC_VALOR) = '100,00')
                AND SCO.SGC_APROV_CONTROLADORIA = 'S' `);

    switch (data.sgc_id_perfil) {
        case '1':
            sql.push(`AND CAST(SCO.SGC_MATRICULA AS NUMBER) = CAST('${data.sgc_matricula}' AS NUMBER) `);
            break;
        case '2':
            sql.push(`AND (SF.SGC_TIPO_FLUXO = 2 OR SF.SGC_TIPO_FLUXO = 3) AND SF.SGC_ID_STATUS = '1' `);
            break;
        case '3':
            sql.push(`AND CAST(SCO.SGC_MATRICULA AS NUMBER) IN
                      (SELECT CAST(SP.MATRICULA_GESTOR_CONTRATO AS NUMBER)
                         FROM SGC_PERMISSOES SP
                        WHERE CAST(SP.MATRICULA_GESTOR_CONTRATO AS NUMBER) = CAST(SCO.SGC_MATRICULA AS NUMBER)
                          AND CAST(SP.MATRICULA_SUPERINTENDENTE AS NUMBER) = CAST('${data.sgc_matricula}' AS NUMBER))  AND SF.SGC_ID_STATUS != '4'
                          AND SF.SGC_ID_CONTRATO =  (SELECT F.SGC_ID_CONTRATO 
                                FROM SGC_FLUXO F
                                WHERE F.SGC_ID_CONTRATO = SF.SGC_ID_CONTRATO                                                          
                                  AND F.SGC_ID_STATUS = '2'
                                  AND F.SGC_ID_PERFIL ='3') `);           
        case '6':
            sql.push(`AND SF.SGC_ID_STATUS !='4' 
                      AND SF.SGC_ID_CONTRATO IN 
                      (SELECT F.SGC_ID_CONTRATO 
                         FROM SGC_FLUXO F
                        WHERE F.SGC_ID_CONTRATO = SF.SGC_ID_CONTRATO                        
                          AND F.SGC_ID_STATUS = '2'
                          AND F.SGC_ID_PERFIL IN ('6','1')
                          AND F.SGC_ID_STATUS != '4') `);
            break;

        default:
            hasPerfil = false;
            break;
    }    
    
    sql.push(`ORDER BY SCO.SGC_ID DESC `);
   
    if (hasPerfil)
       res = await db.comandText(sql.join(""));  
    
    return hasPerfil? res.rows : [];
}

