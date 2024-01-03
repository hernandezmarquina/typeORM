import {useState} from 'react';
import {Recipe} from '../database/recipe';
import {AppDataSource} from '../database';

const useDatabase = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const getRecipes = () => {
    const recipeR = AppDataSource.getRepository(Recipe);
    recipeR
      .find()
      .then(r => {
        console.log('recipes find', r);
        setRecipes(r);
      })
      .catch(e => {
        console.log('recipes find error', JSON.stringify(e));
      });
  };
  return {getRecipes, recipes};
};

export default useDatabase;
