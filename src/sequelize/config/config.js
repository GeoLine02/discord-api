require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  production: {
    url: process.env.INTERNAL_DATABASE_URL + "?ssl=false",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true, // Change this to true if you ever need SSL
        rejectUnauthorized: false, // Change this according to your environment
      },
    },
  },
};
