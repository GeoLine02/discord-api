"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DirectMessages extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "senderId",
        as: "sender",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.belongsTo(models.User, {
        foreignKey: "receiverId",
        as: "receiver",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  DirectMessages.init(
    {
      senderId: { type: DataTypes.INTEGER, allowNull: false },
      receiverId: { type: DataTypes.INTEGER, allowNull: false },
      content: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "DirectMessages",
    }
  );
  return DirectMessages;
};
