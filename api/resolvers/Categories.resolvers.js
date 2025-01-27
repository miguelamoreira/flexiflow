
import db from '../models/index.js';


const Categories = db.Categories


export const resolversCategories = {
    Query: {
        categories: async () => await Categories.findAll(),
        category: async (_, { id }) => {
            const category = await Categories.findByPk(id);
            if (!category) {
                throw new Error(`Category with ID ${id} not found`);
            }
            return category;
        },       
    },

};