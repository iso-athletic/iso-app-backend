module.exports = {
    production: {
        username: process.env.PG_USERNAME,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        dialect: 'postgres'
    },
    development: {
        use_env_variable: 'DATABASE_URL'
    }
}