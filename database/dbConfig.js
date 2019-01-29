const dbEnvironment = process.env.DB_ENVIRONMENT || "development";
const knex = require("knex");

const knexConfig = require("../knexfile.js")[dbEnvironment];

module.exports = knex(knexConfig);
