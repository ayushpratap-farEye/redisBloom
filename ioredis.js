const bloom = require('./utils/IoredisBloom');
const express = require('express');
const app = express();
const {addKeyToFilter, checkIfKeyExists} = require('./controller/ioredis/bloomController');

const start = async function() {
    //  Start web server
    app.get('/', (req, res) => {
        res.send(`it's alive`);
    });
    app.post('/add_key', addKeyToFilter);
    app.post('/check_key', checkIfKeyExists);
    const port = 3000;
    app.listen(port, ()=> {
        console.log(`Server started at port ${port}`);
    });
};

start().catch(err => console.error(err));