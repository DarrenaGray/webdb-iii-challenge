const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/lambda.sqlite3'
    },
    useNullAsDefault: true,
};

const db = knex(knexConfig);

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.send('Server is connected!')
});

server.get('/api/cohorts', (req, res) => {
    db('cohorts')
        .then(cohorts => {
            res.status(200).json(cohorts);
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

server.get('/api/cohorts/:id', (req, res) => {
    db('cohorts')
        .where({ id: req.params.id })
        .first()
        .then(cohort => {
            if (cohort) {
                res.status(200).json(cohort);
            } else {
                res.status(404).json({ message: "The cohort with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ err, message: "Cohorts could not be retrieved." })
        });
});


module.exports = server;