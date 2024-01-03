import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import appStyles from '../styles';
import {recipeIcons} from '../images';
import Button from '../components/Button';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Ingredient} from '../database/ingredient';
import {Unit} from '../types';

const CreateRecipeScreen = () => {
  const navigator = useNavigation();
  const route = useRoute();
  const iconRef = useRef<Image>(null);
  const [icon, setIcon] = useState<number | undefined>();
  const [form, updateForm] = useState({
    name: '',
    difficulty: 0,
    servings: 0,
    time: 0,
    preparation: '',
  });

  const [ingredients, setIngredients] = useState<
    {ingredient: Ingredient; amount: number}[]
  >([]);

  const saveRecipe = () => {
    // const repository = AppDataSource.getRepository(Recipe);
    // repository
    //   .save({
    //     title: form.name,
    //     difficulty: form.difficulty,
    //     servings: form.servings,
    //     preparationTime: form.time,
    //     preparation: form.preparation,
    //     image: recipeIcons[icon || 0],
    //   })
    //   .then(r => {
    //     console.log('Recipes: ', r);
    //     setRecipes(r);
    //   })
    //   .catch(e => {
    //     console.log('Error', JSON.stringify(e));
    //   });
    console.log('Icon: ', JSON.stringify(recipeIcons[icon || 0]));
  };

  const saveIngredients = () => {};

  useEffect(() => {
    console.log('Ingredients: ', route.params);
    if (route.params?.ingredient) {
      setIngredients([
        ...ingredients,
        {ingredient: route.params.ingredient, amount: route.params.amount ?? 0},
      ]);
    }
  }, [route.params?.ingredient]);

  return (
    <ScrollView style={appStyles.container}>
      <Text style={appStyles.label}>Nombre:</Text>
      <TextInput
        onChangeText={name => updateForm({...form, name})}
        style={appStyles.input}
        placeholder="Nombre de la nueva receta"
      />
      <Text style={appStyles.label}>Selecciona un icono para tu receta</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.iconsScroll}>
        {recipeIcons.map((img, index) => (
          <TouchableOpacity key={index} onPress={() => setIcon(index)}>
            <Image
              ref={iconRef}
              source={img}
              style={[styles.icon, index === icon && styles.iconSelected]}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={appStyles.label}>Dificultad:</Text>
          <TextInput
            onChangeText={v =>
              updateForm({...form, difficulty: parseInt(v, 10)})
            }
            style={appStyles.input}
            maxLength={2}
            placeholder="1 al 10"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.column}>
          <Text style={appStyles.label}>Porciones:</Text>
          <TextInput
            onChangeText={v => updateForm({...form, servings: parseInt(v, 10)})}
            style={appStyles.input}
            maxLength={2}
            placeholder="Porciones"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.column}>
          <Text style={appStyles.label}>Tiempo:</Text>
          <TextInput
            onChangeText={v => updateForm({...form, time: parseInt(v, 10)})}
            style={appStyles.input}
            maxLength={3}
            placeholder="En minutos"
            keyboardType="numeric"
          />
        </View>
      </View>
      <Text style={appStyles.label}>Ingredientes:</Text>
      {ingredients.map(({ingredient, amount}) => (
        <View style={[styles.row, {marginTop: 4}]} key={ingredient.id}>
          <Text style={[appStyles.itemText, {flex: 1}]}>
            {ingredient.name} - {amount} {Unit[ingredient.unit]}
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={{color: 'red'}}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity
        style={styles.addIngredient}
        onPress={() => {
          navigator.navigate('Ingredientes');
        }}>
        <Text style={styles.addIngredientText}>+ Agregar ingrediente</Text>
      </TouchableOpacity>
      <Button title="Guardar" onPress={saveRecipe} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  addIngredient: {
    padding: 8,
    marginVertical: 8,
  },
  addIngredientText: {
    color: 'gray',
  },
  iconsScroll: {
    padding: 4,
    marginVertical: 4,
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  iconSelected: {
    borderWidth: 5,
    borderColor: 'blue',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default CreateRecipeScreen;
