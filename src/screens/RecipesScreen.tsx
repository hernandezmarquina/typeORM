import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Recipe} from '../database/recipe';
import {AppDataSource} from '../database';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import appStyles from '../styles';
import {recipeIcons} from '../images';
import AddButton from '../components/AddButton';

const RecipesScreen = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const navigator = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    // Obtenemos las recetas cada vez que la pantalla esta activa
    if (isFocused) {
      getRecipes();
    }
  }, [isFocused]);

  const getRecipes = async () => {
    const repository = AppDataSource.getRepository(Recipe);
    const dbRecipes = await repository.find();
    setRecipes(dbRecipes);
  };

  const onRecipeSelected = (recipe: Recipe) => {
    navigator.navigate('Receta', {recipeId: recipe.id});
  };

  return (
    <View style={styles.container}>
      <AddButton />
      {recipes.map(r => (
        <TouchableOpacity
          key={r.id}
          style={styles.recipe}
          onPress={() => onRecipeSelected(r)}>
          <Image style={styles.icon} source={recipeIcons[r.image]} />
          <View style={styles.textContainer}>
            <Text style={appStyles.label}>{r.title}</Text>
            <Text style={appStyles.itemText}>
              Tiempo de preparación: {r.preparationTime}min
            </Text>
            <View style={styles.itemsContainer}>
              <Text style={appStyles.itemText}>
                Dificultad: {r.difficulty}/5
              </Text>
              <Text style={appStyles.itemText}>
                {r.preparationTime} porciones
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  recipe: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: 'gray',
  },
});

export default RecipesScreen;
