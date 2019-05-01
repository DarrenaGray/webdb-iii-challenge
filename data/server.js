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

// Cohorts

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

server.post('/api/cohorts', (req, res) => {
    db('cohorts')
        .insert(req.body, 'id')
        .then(ids => { // Displays the entire object info of the new cohort being added
            db('cohorts')
                .where({ id: ids[0] })
                .first()
                .then(cohort => {
                    res.status(200).json({ cohort, message: "The cohort successfully added!" })
                })
                .catch(err => {
                    res.status(500).json({ err, message: "There was an error while adding the cohort." })
                });
        })
});

server.put('/api/cohorts/:id', (req, res) => {
    db('cohorts')
        .where({ id: req.params.id })
        .update(req.body)
        .then(updatedCohort => {
            if (updatedCohort) {
                res.status(200).json({ message: "The cohort was successfully updated!" });
            } else {
                res.status(404).json({ message: "The cohort with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ err, message: "There was an error while updating the cohort." });
        });
});

module.exports = server;