const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: "127.0.0.1",
        port: 1433,
        dialect: "mssql",

        dialectOptions: {
            options: {
                encrypt: false,
                trustServerCertificate: true
            }
        },

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },

        logging: console.log,

        // Important: give the connection more time
        connectionTimeout: 30000,
        requestTimeout: 30000
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("SQL Server connected successfully");
    } catch (error) {
        console.error("Database connection failed:");
        console.error(error);
        process.exit(1);
    }
};

module.exports = {
    sequelize,
    connectDB
};