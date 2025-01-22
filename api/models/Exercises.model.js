import { DataTypes } from "sequelize";

const Exercises = (sequelize) => {
  const Exercises = sequelize.define(
    "Exercises",
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
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return Exercises
};
export default Exercises;
