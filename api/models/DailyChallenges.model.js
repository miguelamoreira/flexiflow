const DailyChallenges = (sequelize, DataTypes) => {
    const DailyChallenges = sequelize.define(
      "DailyChallenges",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        date: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        exercise_ids: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        points: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        users_id: {
          type: DataTypes.JSON,
          allowNull: true,
          defaultValue: null,
        },
      },
      {
        timestamps: false,
        freezeTableName: true,
      }
    );
    return DailyChallenges;
};
  
export default DailyChallenges;
  