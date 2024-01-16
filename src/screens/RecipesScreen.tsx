import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Recipe} from '../database/recipe';
import {AppDataSource} from '../database';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import appStyles from '../styles';
import {recipeIcons} from '../images';
import AddButton from '../components/AddButton';
import {ScrollView} from 'react-native-gesture-handler';
import {Like} from 'typeorm';
import {RecipeIngredient} from '../database/recipeIngredient';

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
    setRecipes([...dbRecipes]);

    const r = AppDataSource.getRepository(RecipeIngredient);
    const rI = await r.find({
      relations: {
        ingredient: true,
        recipe: true,
      },
    });
    rI.forEach(ri => {
      console.log(
        `${ri.recipe.title} id: ${ri.recipe.id}`,
        ' ' + ri.ingredient.name,
      );
    });
  };

  const onRecipeSelected = (recipe: Recipe) => {
    navigator.navigate('Receta', {recipeId: recipe.id});
  };

  const onSearch = (v: string) => {
    if (v.length === 0) {
      getRecipes();
      return;
    }
    const repository = AppDataSource.getRepository(Recipe);
    repository
      .find({
        relations: {
          ingredients: {
            ingredient: true,
          },
        },
        where: [
          {
            title: Like(`%${v}%`),
          },
          {
            ingredients: {
              ingredient: {
                name: Like(`%${v}%`),
              },
            },
          },
        ],
      })
      .then(r => {
        setRecipes(r);
      });
  };

  const deleteRecipe = async (recipe: Recipe) => {
    const repository = AppDataSource.getRepository(Recipe);
    repository
      .remove(recipe)
      .then(() => {
        getRecipes();
      })
      .catch(e => {
        console.log('delete recipe error', JSON.stringify(e));
      });
  };

  return (
    <View style={appStyles.container}>
      <ScrollView style={appStyles.scrollContainer}>
        <TextInput
          onChangeText={onSearch}
          style={appStyles.input}
          placeholder="Buscar receta por nombre o ingrediente"
          keyboardType="default"
        />
        {recipes.map(r => (
          <TouchableOpacity
            key={r.id}
            style={styles.recipe}
            onPress={() => onRecipeSelected(r)}>
            <Image style={styles.icon} source={recipeIcons[r.image]} />
            <View style={styles.textContainer}>
              <View style={styles.itemsContainer}>
                <Text style={appStyles.label}>{r.title}</Text>
                <TouchableOpacity onPress={() => deleteRecipe(r)}>
                  <Text style={appStyles.smallText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
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
      </ScrollView>
      <AddButton />
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
