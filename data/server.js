const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.send('Server is connected!')
});

// server.use('/api/cohorts');

module.exports = server;