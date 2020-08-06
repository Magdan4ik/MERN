const config = require('config');
const redis = require('redis');

const REDIS_PORT = config.get('port-redis') || 6379
const client = redis.createClient(REDIS_PORT);

module.exports = client;