import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Recipe} from '../database/recipe';
import {useRoute} from '@react-navigation/native';
import appStyles from '../styles';
import {AppDataSource} from '../database';
import {recipeIcons} from '../images';

const RecipeDetailsScreen = () => {
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);
  const route = useRoute();

  useEffect(() => {
    const params = route.params;
    if (params && params.recipeId) {
      const repository = AppDataSource.getRepository(Recipe);
      repository
        .find({
          relations: {
            ingredients: {
              ingredient: true,
            },
          },
          where: {
            id: params.recipeId,
          },
        })
        .then(r => {
          setRecipe(r[0]);
        });
    }
  }, []);

  return (
    <ScrollView style={appStyles.scrollContainer}>
      {recipe && (
        <View style={appStyles.container}>
          <Text style={appStyles.title}>{recipe.title}</Text>
          <View style={styles.recipe}>
            <Image style={styles.icon} source={recipeIcons[recipe.image]} />
            <View style={styles.textContainer}>
              <Text style={appStyles.itemText}>
                Tiempo de preparación: {recipe.preparationTime}min
              </Text>
              <Text style={appStyles.itemText}>
                Dificultad: {recipe.difficulty}/5
              </Text>
              <Text style={appStyles.itemText}>
                {recipe.preparationTime} porciones
              </Text>
            </View>
          </View>
          <View style={styles.separator} />
          <Text style={appStyles.label}>Ingredientes:</Text>
          {recipe.ingredients.map(i => (
            <Text key={i.ingredient.id} style={appStyles.itemText}>
              {i.ingredient.name} - {i.amount} {i.ingredient.unit}
            </Text>
          ))}
          <View style={styles.separator} />
          <Text style={appStyles.label}>Cómo preparar {recipe.title}</Text>
          <Text style={appStyles.itemText}>{recipe.preparation}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  recipe: {
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: 'gray',
  },
  separator: {
    opacity: 0.2,
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 8,
  },
});

export default RecipeDetailsScreen;
