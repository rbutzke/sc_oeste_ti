const express = require('express');
const exphbs = require('express-handlebars')
const app = express();
const path = require('path');
const db = require('./db/connection');
const bodyParser = require('body-parser');
const Job = require('./models/Job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const port = 3000;

app.listen(port, () => {
    console.log('Express está rodando na porta: ' + port);
});

// body parser

app.use(bodyParser.urlencoded({ extended: false }));

// handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// db connection
db.authenticate().then(() => {
    console.log('Conectado com sucesso !!!');
}).catch((erro) => {
    console.log('Falha ao Conectar: ' + erro);
});

// routes
app.get('/', (req, res) => {

    let search = req.query.job;
    let query = '%' + search + "%";

    if (!search) {
        Job.findAll({
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            .then(jobs => {
                res.render('index', {
                    jobs
                });

            })
            .catch(err => console.log(err));
    } else {
        Job.findAll({
                where: {
                    title: {
                        [Op.like]: query
                    }
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            .then(jobs => {
                res.render('index', {
                    jobs,
                    search
                });

            })
            .catch(err => console.log(err));
    }
});

// jobs routes
app.use('/jobs', require('./routes/jobs'));