"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  // console.log("Model", Model.init, Model.findAll);
  class Classes extends Model {
    static associate(models) {
      this.belongsToMany(models.users, { through: "usersClasses" });
    }
  }
  Classes.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      fullTime: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      teacher: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "classes",
      underscored: true,
    }
  );
  return Classes;
};
