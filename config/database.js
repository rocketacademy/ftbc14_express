module.exports = {
  development: {
    username: "postgres",
    password: null,
    database: "ftbc14_sequelize",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "postgres",
    password: null,
    database: "ftbc14_sequelize_production",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
