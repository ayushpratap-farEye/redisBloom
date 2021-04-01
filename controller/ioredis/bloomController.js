const { bloomFilterName } = require('../../config/redisConfig');
const bloom = require('../../utils/IoredisBloom');

async function addKeyToFilter(req, res) {
    const key = req.query.key.toString();

    //  Add the key to the filter
    await bloom.addKey(bloomFilterName, key);

    res.send(`key ${key} added to filter`);
}

async function checkIfKeyExists(req, res) {
    const key = req.query.key.toString();

    //  Check for key in filter
    const result = await bloom.existsKey(bloomFilterName, key);

    if (result) {
        res.send(`key ${key} exists`);
    } else {
        res.send(`key ${key} does not exists`)
    }
}

module.exports.addKeyToFilter = addKeyToFilter;
module.exports.checkIfKeyExists = checkIfKeyExists;