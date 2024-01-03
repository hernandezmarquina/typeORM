import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Recipe} from '../database/recipe';
import {AppDataSource} from '../database';
import {useNavigation} from '@react-navigation/native';

const RecipesScreen = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const repository = AppDataSource.getRepository(Recipe);
    repository
      .find()
      .then(r => {
        console.log('Recipes: ', r);
        setRecipes(r);
      })
      .catch(e => {
        console.log('Error', JSON.stringify(e));
      });
  }, []);
  return (
    <View style={styles.container}>
      <AddButton />
      <Text>RecipesScreen</Text>
    </View>
  );
};

const AddButton = () => {
  const navigator = useNavigation();
  return (
    <TouchableOpacity
      style={styles.addButton}
      onPress={() => navigator.navigate('Nueva Receta')}>
      <Text style={styles.add}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    backgroundColor: 'red',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  add: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default RecipesScreen;
