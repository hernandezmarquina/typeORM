import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RecipesScreen from './RecipesScreen';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Recipes" component={RecipesScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
