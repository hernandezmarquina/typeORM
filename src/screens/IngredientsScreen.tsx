import React, {useEffect, useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import appStyles from '../styles';
import {Ingredient} from '../database/ingredient';
import {Unit} from '../types';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

const pickerItems = Object.keys(Unit).map(k => ({
  label: Unit[k],
  value: k,
}));

const IngredientsScreen = () => {
  const navigator = useNavigation();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [units, setUnits] =
    useState<{label: string; value: string}[]>(pickerItems);
  const [search, setSearch] = useState<string>('');

  const [itemSelected, setItemSelected] = useState<Ingredient | undefined>();
  const [amountModalVisible, setAmountModalVisible] = useState(false);
  const [newIngredientModalVisible, setNewIngredientModalVisible] =
    useState(false);

  const [amount, setAmount] = useState<number>(0);

  const [newIngredient, setNewIngredient] = useState<
    {name: string; unit: Unit} | undefined
  >();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  useEffect(() => {
    setIngredients([
      {
        id: 1,
        name: 'Harina de avena',
        unit: Unit.gramos,
        recipes: [],
      },
      {
        id: 2,
        name: 'Platano',
        unit: Unit.piezas,
        recipes: [],
      },
      {
        id: 3,
        name: 'Canela',
        unit: Unit.gramos,
        recipes: [],
      },
      {
        id: 4,
        name: 'Vainilla',
        unit: Unit.cucharada,
        recipes: [],
      },
      {
        id: 5,
        name: 'Sal',
        unit: Unit.pizca,
        recipes: [],
      },
      {
        id: 6,
        name: 'Huevo',
        unit: Unit.piezas,
        recipes: [],
      },
    ]);
  }, []);

  return (
    <View style={appStyles.container}>
      <TextInput
        onChangeText={v => {}}
        style={appStyles.input}
        placeholder="Buscar ingrediente"
        keyboardType="default"
      />
      <TouchableOpacity
        style={styles.addIngredient}
        onPress={() => {
          setNewIngredientModalVisible(true);
        }}>
        <Text style={styles.addIngredientText}>
          + Agregar nuevo ingrediente
        </Text>
      </TouchableOpacity>
      <ScrollView>
        {ingredients.map(ingredient => (
          <View style={styles.itemContainer} key={ingredient.id}>
            <Text style={appStyles.itemText}>{ingredient.name}</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                setItemSelected(ingredient);
                setAmountModalVisible(true);
              }}>
              <Text style={styles.addButtonText}>agregar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <Modal visible={amountModalVisible} animationType="slide" transparent>
        <View style={styles.modalView}>
          <View style={styles.modalContainer}>
            <View style={styles.row}>
              <Text style={appStyles.label}>{itemSelected?.name}</Text>
              <TextInput
                onChangeText={v => setAmount(parseInt(v, 10))}
                style={appStyles.input}
                placeholder={`Cantidad en ${Unit[itemSelected?.unit]}`}
                keyboardType="numeric"
              />
            </View>
            <Button
              title="Agregar"
              onPress={() => {
                const item = {...itemSelected};
                setAmountModalVisible(false);
                setTimeout(() => {
                  setItemSelected(undefined);
                  navigator.navigate(
                    'Nueva Receta',
                    {ingredient: item, amount: amount},
                    {merge: true},
                  );
                }, 200);
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal
        visible={newIngredientModalVisible}
        animationType="slide"
        transparent>
        <View style={styles.modalView}>
          <View style={styles.modalContainer}>
            <View style={styles.row}>
              <Text style={appStyles.label}>Nombre: </Text>
              <TextInput
                onChangeText={v => {
                  setNewIngredient({...newIngredient, name: v});
                }}
                style={[appStyles.input, {flex: 1}]}
                placeholder={'Nombre ejemplo...'}
                keyboardType="default"
              />
            </View>
            <View style={styles.row}>
              <TextInput
                onChangeText={v => setAmount(parseInt(v, 10))}
                style={[appStyles.input, {flex: 1}]}
                placeholder={'0'}
                keyboardType="numeric"
              />
              <View style={[appStyles.label, {flex: 7, marginLeft: 4}]}>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={units}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setUnits}
                  placeholder={'Unidad de medida'}
                />
              </View>
            </View>
            <Button
              title="Agregar"
              onPress={() => {
                const item = {...itemSelected};
                setItemSelected(undefined);
                setTimeout(() => {
                  navigator.navigate(
                    'Nueva Receta',
                    {ingredient: item, amount: amount},
                    {merge: true},
                  );
                }, 200);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  addButton: {
    padding: 8,
  },
  addButtonText: {
    color: 'blue',
    fontSize: 12,
  },
  addIngredient: {
    marginVertical: 8,
    alignSelf: 'flex-end',
  },
  addIngredientText: {
    color: 'gray',
  },
});

export default IngredientsScreen;
