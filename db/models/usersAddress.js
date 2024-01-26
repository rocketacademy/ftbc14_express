"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UsersAddresses extends Model {
    static associate(models) {
      this.belongsTo(models.users);
    }
  }
  UsersAddresses.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      primaryAddress: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: "usersAddresses",
      underscored: true,
    }
  );
  return UsersAddresses;
};
