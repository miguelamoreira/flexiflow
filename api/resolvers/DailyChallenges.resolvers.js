import { PubSub } from 'graphql-subscriptions';

import db from '../models/index.js';



const Exercises = db.Exercises
const DailyChallenges = db.DailyChallenges
const pubsub = new PubSub();

export const resolversDaily = {
    Query: {
        dailyChallenge: async () => {
          const today = new Date().toISOString().split("T")[0];
        
          let challenge = await DailyChallenges.findOne({ where: { date: today } });
        
          if (!challenge) {
            return null 
          }
        
          const exerciseIds = challenge.exercise_ids.split(",");
          const exerciseDetails = await Exercises.findAll({
            where: {
              id: exerciseIds,
            },
          });
        
          return {
            id: challenge.id,
            date: challenge.date,
            exercises: exerciseDetails,
            points: challenge.points,
            users: challenge.users_id,
          };
        },        
    },
    Mutation: {
        createDailyChallenge: async (_, { date, points }) => {
            const existingChallenge = await DailyChallenges.findOne({
              where: { date },
            });
      
            if (existingChallenge) {
              throw new Error(`Daily challenge for date ${date} already exists.`);
            }
      
            const allExercises = await Exercises.findAll();
      
            if (!allExercises || allExercises.length === 0) {
              throw new Error("No exercises available to create a challenge.");
            }
      
            const randomExercises = allExercises
              .sort(() => 0.5 - Math.random())
              .slice(0, 5)
              .map((exercise) => exercise.id);
      
            const exerciseIdsString = randomExercises.join(",");
            const challenge = await DailyChallenges.create({
              date,
              exercise_ids: exerciseIdsString,
              points,
              users_id: "",
            });

            const exerciseDetails = await Exercises.findAll({
              where: { id: randomExercises },
            });

            pubsub.publish('DAILY_CHALLENGE_CREATED', {
              dailyChallengeCreated: challenge
            });
        
            return {
              id: challenge.id,
              date: challenge.date,
              exercises: exerciseDetails,
              points: challenge.points,
              users: challenge.users_id,
            };
        },           
    },
    Subscription: {
        dailyChallengeCreated: {
            subscribe: () => pubsub.asyncIterableIterator('DAILY_CHALLENGE_CREATED'),
        },
    },
};