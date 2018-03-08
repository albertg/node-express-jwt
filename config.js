var appConfig = {
    jwtTokenSecret: '6EB3CC6276DC95124F493DF7D5342',
    database: 'mongodb://localhost:27017/CRMdb',
    productdb: {
        database: 'product',
        username: 'root',
        password: 'root',
        host: 'localhost',
        dialect: 'mysql'
    }
};

module.exports = appConfig;