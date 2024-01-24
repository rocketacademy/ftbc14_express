"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  // console.log("Model", Model.init, Model.findAll);
  class UsersClasses extends Model {
    static associate(models) {
      this.belongsTo(models.classes);
      this.belongsTo(models.users);
    }
  }
  UsersClasses.init(
    {
      classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "class",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "users_classes",
      underscored: true,
    }
  );
  return UsersClasses;
};
