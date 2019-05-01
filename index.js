const server = require('./data/server');

const port = process.env.PORT || 4400;

server.listen(port, () => {
    console.log('\n* Server running on https://localhost:4400/ *\n')
})
