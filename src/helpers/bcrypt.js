const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  console.log(password);
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("hashedPasssowrd: ", hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.log("password hashing error: ", error);
    throw new Error("Could not hash password");
  }
};

module.exports = hashPassword;
