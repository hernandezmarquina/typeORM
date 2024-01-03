import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RecipesScreen from './RecipesScreen';
import RecipeDetailsScreen from './RecipeDetailsScreen';
import IngredientsScreen from './IngredientsScreen';
import CreateRecipeScreen from './CreateRecipeScreen';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Recetas" component={RecipesScreen} />
      <Stack.Screen name="Detalles" component={RecipeDetailsScreen} />
      <Stack.Screen name="Ingredientes" component={IngredientsScreen} />
      <Stack.Screen name="Nueva Receta" component={CreateRecipeScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
