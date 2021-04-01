const {BloomFilter} = require('@albert-team/rebloom');
const {bloomFilterName, redisHostIp, redisHostPort} = require('../config/redisConfig');
class ReBloom {
    #filter = null;
    constructor() {
        this.#filter = this.getFilter();
    }

    getFilter() {
        //  Check if filter exists
        if (this.#filter) {
            //  filter exists return filter
            return this.#filter;
        } else {
            //  Create filter
            return new BloomFilter(
                bloomFilterName, 
                {
                    host: redisHostIp,
                    port: redisHostPort
                }   
            );
        }
    }

    /**
     * Manually connect with bloom filter
     */
    async connect() {
        await this.#filter.connect();
        console.log(`Bloom filter connected`);
    }

    /**
     * Add the key to the bloom filter
     * @param {String} e 
     * @returns {Number} 1 if key is added succesfully, 0 on faliure
     */
    async addKey(e) {
        const res = await this.#filter.add(e);
        console.log(`element ${e} added to filter`);
        return res;
    }

    /**
     * Check if key exists in bloom filter or not
     * @param {String} e 
     * @returns {Number} 1 if key exists, 0 if key does not exists
     */
    async existsKey(e) {
        const res = await this.#filter.exists(e);
        return res;
    }

    /**
     * Manually disconnect from bloom filter
     */
    async disconnect() {
        await this.#filter.disconnect();
        console.log(`Bloom filter disconnected`);
    }
}

module.exports = new ReBloom();