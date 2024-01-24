"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  // console.log("Model", Model.init, Model.findAll);
  class Users extends Model {
    static associate(models) {
      this.hasMany(models.users_addresses);
    }
  }
  Users.init(
    {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: DataTypes.INTEGER,
      // },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      gender: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      // createdAt: {
      //   type: DataTypes.DATE,
      //   allowNull: false,
      //   defaultValue: new Date(),
      // },
      // updatedAt: {
      //   type: DataTypes.DATE,
      //   allowNull: false,
      //   defaultValue: new Date(),
      // },
    },
    {
      sequelize,
      modelName: "users",
      underscored: true,
    }
  );
  return Users;
};
