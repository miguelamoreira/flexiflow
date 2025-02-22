import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../models/index.js";
import "dotenv/config";
const JWT_SECRET = process.env.SECRET;

const Categories = db.Categories;
const Users = db.Users;
const Exercises = db.Exercises;
const DailyChallenges = db.DailyChallenges;

export const resolversUsers = {
  Query: {
    users: async () => await Users.findAll(),
    user: (_, { id }) => {
      const user = Users.findByPk(id);
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      return user;
    },
  },
  Mutation: {
    createUser: async (_, { name, email, password }) => {
      const existingUser = await Users.findOne({ where: { email: email } });

      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await Users.create({
        name,
        email,
        password: hashedPassword,
        title: "Rising Sun",
        total_points: 0,
        categories_completed: JSON.stringify([]),
      });

      return newUser;
    },
    login: async (_, { email, password }) => {
      const user = await Users.findOne({ where: { email: email } });
      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return token;
    },
    UpdateUserTitle: async (_, { id, title }) => {
      const user = await Users.findOne({ where: { id: id } });
      if (!user) {
        throw new Error("User not found");
      }

      user.title = title
      user.save();

      return user;
    },
    completeCategory: async (_, { userId, categoryId }) => {
      const user = await Users.findByPk(userId);
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }
      user.categories_completed = JSON.parse(user.categories_completed);
      const category = await Categories.findByPk(categoryId);
      if (!category) {
        throw new Error(`Category with ID ${categoryId} not found`);
      }

      if (user.categories_completed.includes(categoryId)) {
        throw new Error(`Already won the category with ID ${categoryId}`);
      }

      user.categories_completed.push(categoryId);
      user.total_points += category.points;
      user.categories_completed = JSON.stringify(user.categories_completed);

      user.save();

      return user;
    },
    completeDailyChallenge: async (_, { userId }) => {
      const today = new Date().toISOString().split("T")[0];
      const challenge = await DailyChallenges.findOne({
        where: { date: today },
      });

      if (!challenge) {
        throw new Error("No daily challenge available for today.");
      }
      
      let users = challenge.users_id ? JSON.parse(challenge.users_id) : [];
      const userIdNumber = parseInt(userId, 10);
      const user = await Users.findByPk(userId);
      if (!user) {
        throw new Error(`User with ID ${userId} not found.`);
      }
      if(!users.includes(userIdNumber)){
        users.push(userIdNumber)
        challenge.users_id = JSON.stringify(users);
        await challenge.save();

        
        

        user.total_points += challenge.points;
        await user.save();

        const usersDetails = await Users.findAll({
          where: {
            id: users,
          },
        });
      }
      return {
        id: challenge.id,
        points: challenge.points,
        total_points: user.total_points,
        users: JSON.stringify(users),
      };
    },
  },
};
