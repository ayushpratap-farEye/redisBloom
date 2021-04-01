<h3 align="center">redisbloom</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/ayushpratap-farEye/redisBloom/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/ayushpratap-farEye/redisBloom/pulls)

</div>

---

<p align="center"> Few lines describing your project.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](../TODO.md)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

This is a POC for demosntration of how to use redis bloom filter with nodejs
to help in de duplication data

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
- [Redis] (https://redis.io/) - Redis Server
- [RedisBloom] (https://oss.redislabs.com/redisbloom/Quick_Start/) - Redis Bloom Filter

## ✍️ Authors <a name = "authors"></a>

- [@ayushpratap-farEye](https://github.com/ayushpratap-farEye)