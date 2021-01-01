require('dotenv').config();
const config = {
    database : {
        host: process.env[`DATABASE_HOST`],
        database: process.env[`DATABASE_NAME`],
        user: process.env[`DATABASE_USER`],
        password: process.env[`DATABASE_PASSWORD`],
        port: parseInt(process.env[`DATABASE_PORT`], 10)
    }
}


export default config;