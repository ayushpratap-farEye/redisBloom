<h3 align="center">redisbloom</h3>

---

<p align="center"> Redis bloom filter with nodejs
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](./TODO.md)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

This is a POC for demosntration of how to use redis bloom filter with nodejs
to help in de duplication data.

This project contains 2 implementation:
1. With ioredis
2. With rebloom library : https://albert-team.github.io/rebloom/

### With ioredis
ioredis is a popular nodejs client for Redis.
As bloomfilter is a module which has to be loaded on redis to work with, no Redis client implicitly 
has the bloom filter commands built in work out of the box. This is where ioredis comes handy, ioredis has a
builtin module **createBuiltinCommand** which can be leveraged to add any Redis-cli command. With this we can
use same redis connection for whole application.

Here we've added commands to _ADD_, _EXISTS_ & _RESERVE_ to ioredis intance. To know more about it's implementation take a look [here](https://github.com/ayushpratap-farEye/redisBloom/blob/ceeb8415b4a169f6e85e166d5524ceffe451856e/utils/IoredisBloom.js)

### With rebloom library
RedisBloom module has a JavaScript library named [rebloom](https://albert-team.github.io/rebloom/).
This library provides lot of capability out of the box like _ADD_ & _EXISTS_, while using this we don't have to
change or add anything to the libaray. It creates it's own connection to Redis's bloom filter which will be seperate to the
connection to Redis used in application.

To know more it's implementation take a look [here](https://github.com/ayushpratap-farEye/redisBloom/blob/ceeb8415b4a169f6e85e166d5524ceffe451856e/utils/Rebloom.js)


## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for testing purposes.

### Prerequisites

- Redis server
- RedisBloom module
- NodeJs > 12.XX
- npm > 6.13.XX

**Installing redis**

```
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
make
sudo make install
```

**Installing RedisBloom**

We have multiple ways to use this module

1. Launch RedisBloom with Docker 
```
docker run -p 6379:6379 --name redis-redisbloom redislabs/rebloom:latest
```
Use RedisBloom with redis-cli
```
# redis-cli
127.0.0.1:6379>
```
Create a new bloom filter by adding a new item:
```
# 127.0.0.1:6379> BF.ADD newFilter foo
(integer) 1
```
Find out whether an item exists in the filter:
```
# 127.0.0.1:6379> BF.EXISTS newFilter foo
(integer) 1
```
In this case, 1 means that the foo is most likely in the set represented by newFilter. But recall that false positives are possible with Bloom filters.
```
# 127.0.0.1:6379> BF.EXISTS newFilter bar
(integer) 0
```

2. Other way is to build the module ourselves and loading it on redis-server

Building
```
git clone https://github.com/RedisBloom/RedisBloom.git
cd redisbloom
make
```

Running

```
# Assuming you have a redis build from the unstable branch:
/path/to/redis-server --loadmodule ./redisbloom.so
```

### Installing

To start using this POC clone the repo

```
git clone https://github.com/ayushpratap-farEye/redisBloom
```

Install node modules

```
cd redisBloom
npm install
```

Start server for **ioredis** implementation
```
npm run ioredis
# ioredis object created
# Server started at port 3000
```

Start server for rebloom implementation
```
npm run rebloom
# Bloom filter connected
# Server started at port 3000
```

## 🎈 Usage <a name="usage"></a>

### To add key to the filter make POST request to **/add_key**
```
curl --location --request POST 'localhost:3000/add_key?key=foo'
```

### To check if key exists in filter then
```
curl --location --request POST 'localhost:3000/check_key?key=foo'
```

## ⛏️ Built Using <a name = "built_using"></a>

- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Redis](https://redis.io/) - Redis Server
- [RedisBloom](https://oss.redislabs.com/redisbloom/Quick_Start/) - Redis Bloom Filter

## ✍️ Authors <a name = "authors"></a>

- [@ayushpratap-farEye](https://github.com/ayushpratap-farEye)
---
