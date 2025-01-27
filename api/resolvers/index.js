import { mergeResolvers } from '@graphql-tools/merge';
import { resolversCategories } from './Categories.resolvers.js';
import { resolversExercises } from './Exercises.resolvers.js';
import { resolversUsers } from './Users.resolvers.js';
import { resolversDaily } from './DailyChallenges.resolvers.js';




export const resolvers = mergeResolvers([resolversCategories, resolversExercises, resolversUsers, resolversDaily]);