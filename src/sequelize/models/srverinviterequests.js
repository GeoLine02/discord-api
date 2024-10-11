"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SrverInviteRequests extends Model {
    static associate(models) {}
  }
  SrverInviteRequests.init(
    {
      serverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Servers",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "SrverInviteRequests",
    }
  );
  return SrverInviteRequests;
};
