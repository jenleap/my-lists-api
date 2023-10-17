import merge from 'lodash.merge';

process.env.NODE_ENV = process.env.NODE_ENV || "local";

let envConfig; 

if (process.env.NODE_ENV === 'production') {
    envConfig = require('./prod').default;
} else {
    envConfig = require('./local').default;
}

export default merge({
    env: process.env.NODE_ENV,
    dbUrl: process.env.PG_DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT
}, envConfig);