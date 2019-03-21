'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Carrega as Rotas
const indexRoute = require('./routes/index-route');
const contratosRoute = require('./routes/contrato-route');
const classificacoesRoute = require('./routes/classificacao-route');
const fluxosRoute = require('./routes/fluxo-route');

const dbConfig = require('./config');
const db = require('./services/database-service');

const defaultThreadPoolSize = 20;

process.env.UV_THREADPOOL_SIZE = dbConfig.connStringSepd.poolMax + defaultThreadPoolSize;

async function startup() {
  try {
    console.log('Iniciando banco de dados...');
    await db.initialize();  
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startup();

async function shutdown(e) {
  let err = e;
  try {
    console.log('Fechando banco de dados...');
    await db.close();   
  } catch (e) {
    console.log('Erro:', e);
    err = err || e;
  }

  if (err) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}


process.on('SIGTERM', () => {
  console.log('Received SIGTERM');
  shutdown(); 
});

process.on('SIGINT', () => {
  console.log('Received SIGINT');
  shutdown(); 
});

process.on('uncaughtException', err => {
  console.log('Uncaught exception');
  console.error(err);
  shutdown(err); 
});

app.use(bodyParser.json({
  limit: '5mb'
}));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Habilita o CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', indexRoute);
app.use('/sgc/contratos', contratosRoute);
app.use('/sgc/classificacoes', classificacoesRoute);
app.use('/sgc/fluxos', fluxosRoute);

module.exports = app;