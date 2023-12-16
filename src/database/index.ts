import {DataSource} from 'typeorm';
import {Ingredient} from './ingredient';
import {Recipe} from './recipe';
import {RecipeIngredient} from './recipeIngredient';

const AppDataSource = new DataSource({
  type: 'react-native',
  database: 'recipesdb',
  location: 'default',
  logging: ['error'],
  entities: [Recipe, Ingredient, RecipeIngredient],
  synchronize: true,
});

export {AppDataSource};
