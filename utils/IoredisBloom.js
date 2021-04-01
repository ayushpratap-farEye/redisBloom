const EventEmitter = require("events");
const Ioredis = require('ioredis');
const { redisHostPort, redisHostIp, redisConnectionIpFamily, bloomFilterName } = require("../config/redisConfig");

class ReBloom extends EventEmitter {
    commands = ['BF.ADD', 'BF.EXISTS', 'BF.RESERVE'];
    cmds = {};
    client;
    constructor(redis) {
        super();
        this.client = redis;
        this.setCommmands();
    }

    setCommmands() {
        this.commands.forEach((command) => {
            const cmd = this.client.createBuiltinCommand(command);
            this.cmds[command] = cmd.string;
            this.cmds[`${command}Buffer`] = cmd.buffer;
        });
    }

    async add(key, value) {
        const cmd = this.cmds['BF.ADD'];
        return cmd.call(this.client, key, value);
    }

    async exists(key, value) {
        const cmd = this.cmds['BF.EXISTS'];
        return cmd.call(this.client, key, value);
    }

    async reserve(key, errRate, capacity) {
        const cmd = this.cmds['BF.RESERVE'];
        return cmd.call(this.client, key, errRate, capacity);
    }
}

class Redis {
    #reBloom;
    constructor() {
        this.#reBloom = this.getRedisBloomConnection();
    }

    getRedisBloomConnection() {
        //  Check if redis connection exists
        if (this.#reBloom) {
            return this.#reBloom;
        } else {
            //  Create connection
            const ioredis = new Ioredis({
                port: redisHostPort,
                host: redisHostIp,
                family: redisConnectionIpFamily,

            });
            console.log(`ioredis object created`);
            //  Get the object of ReBloom
            const r = new ReBloom(ioredis);

            //  Return r
            return r;
        }
    }

    /**
     * Add the key to the bloom filter
     * @param {String} key 
     */
    async addKey(key) {
        await this.#reBloom.add(bloomFilterName, key);
        console.log(`element added to filter`);
    }

    /**
     * Checks if key exists in bloom filter or not
     * @param {String} key 
     * @returns {Number} 1 if key exists, 0 if key does not exists
     */
    async existsKey(key) {
        const res = await this.#reBloom.exists(bloomFilterName, key);
        console.log(`checking element`);
        return res;
    }

    /**
     * Create new bloom filter in redis
     * @param {String} filter name of the bloom filter
     * @param {Number} errRate error rate is a number between 0 & 1, e.g
     * for error rate of 1 in 1000 , error rate will be 0.0001 
     * @param {Number} capacity To number of keys to be added to the filter
     */
    async reserveFilter(filter, errRate, capacity) {
        await this.#reBloom.reserve(filter, errRate, capacity);
    }
}

module.exports = new Redis();