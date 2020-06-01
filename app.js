const express = require('express');
const app = express();
const db = require('./db/connection');
const bodyParser = require('body-parser');

const port = 3000;

app.listen(port, () => {
    console.log('Express está rodando na porta: ' + port);
});

// body parser

app.use(bodyParser.urlencoded({ extended: false }));

// db connection
db.authenticate().then(() => {
    console.log('Conectado com sucesso !!!');
}).catch((erro) => {
    console.log('Falha ao Conectar: ' + erro);
});

// routes
app.get('/', (req, res) => {
    res.send('Api Express Ativa na porta:' + port);
});

// jobs routes
app.use('/jobs', require('./routes/jobs'));