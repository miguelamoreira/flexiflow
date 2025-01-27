import db from "../models/index.js";

const Categories = db.Categories;
const Users = db.Users;
const Exercises = db.Exercises;
const DailyChallenges = db.DailyChallenges;

export const resolversExercises = {
  Query: {
    exercises: async () => await Exercises.findAll(),
    exercise: async (_, { id }) => {
      const exercise = await Exercises.findByPk(id);
      if (!exercise) {
        throw new Error(`Exercise with ID ${id} not found`);
      }
      return exercise;
    },
    exercisesByCategoryID: async (_, { id }) => {
      const filteredExercises = await Exercises.findAll({
        where: { category_id: id },
      });
      if (!filteredExercises) {
        throw new Error(`Exercises with category ID ${id} not found`);
      }
      return filteredExercises;
    },
  },
};
