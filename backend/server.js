require("dotenv").config();

const app = require("./src/app");

const {
    sequelize,
    connectDB
} = require("./src/config/database");

require("./src/models");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

console.log("Database connection verified");

        app.listen(PORT, () => {
            console.log(
                `Server running on http://localhost:${PORT}`
            );
        });

    } catch (error) {
        console.error(
            "Server startup failed:",
            error
        );
    }
};

startServer();