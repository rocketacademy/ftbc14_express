require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: null,
    database: process.env.DB_DATABASE,
    host: "127.0.0.1",
    dialect: process.env.DB_DIALECT,
  },
  production: {
    username: "postgres",
    password: null,
    database: "ftbc14_sequelize_production",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
