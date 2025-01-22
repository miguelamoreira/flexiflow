import { DataTypes } from "sequelize";

const Categories = (sequelize) => {
  const Categories = sequelize.define(
    "Categories",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      min_points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      points: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return Categories
};

export default Categories;
