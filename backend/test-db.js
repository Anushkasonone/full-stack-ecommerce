require("dotenv").config();

const { Connection } = require("tedious");

const config = {
    server: "127.0.0.1",
    authentication: {
        type: "default",
        options: {
            userName: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        }
    },
    options: {
        database: process.env.DB_NAME,
        port: 1433,
        encrypt: false,
        trustServerCertificate: true
    }
};

const connection = new Connection(config);

connection.on("connect", (err) => {
    if (err) {
        console.error("TEDIOUS CONNECTION FAILED:");
        console.error(err);
    } else {
        console.log("TEDIOUS CONNECTED SUCCESSFULLY");
    }

    connection.close();
});

connection.connect();