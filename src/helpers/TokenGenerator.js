const jwt = require("jsonwebtoken");
const { Token } = require("../sequelize/models");

const generateAccessToken = async (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
};

const generateRefreshToken = async (user) => {
  const refreshToken = jwt.sign(
    {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // Invalidate old refresh tokens
  // await Token.update({ valid: false }, { where: { userId: user.id } });

  // Save new refresh token in the database
  // await Token.create({
  //   token: refreshToken,
  //   userId: user.id,
  //   expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days expiration
  // });

  return refreshToken;
};

module.exports = { generateRefreshToken, generateAccessToken };
