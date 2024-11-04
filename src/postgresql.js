// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(process.env.INTERNAL_DATABASE_URL, {
//   dialect: "postgres",
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false, // Only if you're having SSL issues
//     },
//   },
// });

// const connection = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

// module.exports = connection;

const Sequelize = require("sequelize");

const databaseUrl =
  process.env.INTERNAL_DATABASE_URL || process.env.EXTERNAL_DATABASE_URL;
const useSSL = process.env.USE_SSL === "true";

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  dialectOptions: useSSL
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
  logging: console.log,
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error(
      "Unable to connect to the database:",
      error.message,
      error.stack
    );
  }
};

module.exports = connection;
